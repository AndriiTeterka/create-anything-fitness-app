import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dateKey = (date) =>
  typeof date === 'string' ? date : new Date(date).toISOString().split('T')[0];

let __setStateRef;

export const useScheduleStore = create(
  persist(
    (set, get) => {
      __setStateRef = set;
      return ({
      selectedDate: dateKey(new Date()),
      eventsByDate: {},
      hydrated: false,

      // Selectors / setters
      setSelectedDate: (date) => set({ selectedDate: dateKey(date) }),
      setEventsForDate: (date, items) =>
        set((state) => {
          const key = dateKey(date);
          return { eventsByDate: { ...state.eventsByDate, [key]: items } };
        }),
      addEvent: (date, item) =>
        set((state) => {
          const key = dateKey(date);
          const prev = state.eventsByDate[key] || [];
          return { eventsByDate: { ...state.eventsByDate, [key]: [...prev, item] } };
        }),
      removeEvent: (date, id) =>
        set((state) => {
          const key = dateKey(date);
          const prev = state.eventsByDate[key] || [];
          return {
            eventsByDate: { ...state.eventsByDate, [key]: prev.filter((e) => e.id !== id) },
          };
        }),
      clearAll: () => set({ eventsByDate: {} }),

      // Demo data until backend/state is wired
      seedDemoData: () => {
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const inTwoDays = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

        const schedule = {
          [dateKey(today)]: [
            { id: 'w1', title: 'Upper Body Strength', time: '07:00', duration: '45 min' },
            { id: 'w2', title: 'Core Stability', time: '18:00', duration: '20 min' },
          ],
          [dateKey(tomorrow)]: [
            { id: 'w3', title: 'Morning Cardio', time: '06:30', duration: '30 min' },
          ],
          [dateKey(inTwoDays)]: [
            { id: 'w4', title: 'Lower Body Power', time: '17:30', duration: '40 min' },
          ],
        };

        set({ eventsByDate: schedule });
      },
    });
    },
    {
      name: 'schedule-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedDate: state.selectedDate,
        eventsByDate: state.eventsByDate,
      }),
      onRehydrateStorage: () => (_state, _error) => {
        // Called after hydration completes or errors
        try {
          __setStateRef?.({ hydrated: true });
        } catch {}
      },
    }
  )
);
