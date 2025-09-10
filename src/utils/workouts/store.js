import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const now = () => Date.now();
const USER_GUEST = 'guest';

export const useWorkoutsStore = create(
  persist(
    (set, get) => ({
      savedByUser: {}, // { [userKey]: { [id]: true } }
      historyByUser: {}, // { [userKey]: Array<{ id: string|number, at: number, type: 'view'|'complete' }> }

      // Helpers
      userKeyFor: (user) => user?.id || USER_GUEST,

      // Saved / Favorites
      isSaved: (userKey, id) => !!get().savedByUser?.[userKey]?.[String(id)],
      toggleSaved: (userKey, id) =>
        set((state) => {
          const saved = { ...(state.savedByUser[userKey] || {}) };
          const key = String(id);
          if (saved[key]) delete saved[key];
          else saved[key] = true;
          return { savedByUser: { ...state.savedByUser, [userKey]: saved } };
        }),
      save: (userKey, id) =>
        set((state) => ({
          savedByUser: {
            ...state.savedByUser,
            [userKey]: { ...(state.savedByUser[userKey] || {}), [String(id)]: true },
          },
        })),
      unsave: (userKey, id) =>
        set((state) => {
          const next = { ...(state.savedByUser[userKey] || {}) };
          delete next[String(id)];
          return { savedByUser: { ...state.savedByUser, [userKey]: next } };
        }),

      // History
      recordAccess: (userKey, id) =>
        set((state) => ({
          historyByUser: {
            ...state.historyByUser,
            [userKey]: [
              ...(state.historyByUser[userKey] || []),
              { id: String(id), at: now(), type: 'view' },
            ],
          },
        })),
      recordComplete: (userKey, id) =>
        set((state) => ({
          historyByUser: {
            ...state.historyByUser,
            [userKey]: [
              ...(state.historyByUser[userKey] || []),
              { id: String(id), at: now(), type: 'complete' },
            ],
          },
        })),
      clearHistory: (userKey) =>
        set((state) => ({ historyByUser: { ...state.historyByUser, [userKey]: [] } })),
      clearAll: () => set({ savedByUser: {}, historyByUser: {} }),
    }),
    {
      name: 'workouts-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        savedByUser: state.savedByUser,
        historyByUser: state.historyByUser,
      }),
    }
  )
);

// Utilities for consumers
export const getRecentIds = (history = [], days = 30) => {
  const cutoff = now() - days * 24 * 60 * 60 * 1000;
  const latestById = new Map();
  for (const evt of history) {
    if (evt.at >= cutoff) {
      const key = String(evt.id);
      const prev = latestById.get(key);
      if (!prev || evt.at > prev.at) latestById.set(key, { ...evt, id: key });
    }
  }
  // Sort by most recent first
  return Array.from(latestById.values())
    .sort((a, b) => b.at - a.at)
    .map((e) => e.id);
};
