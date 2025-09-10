import { create } from 'zustand';

export const FILTERS = {
  MY: 'MY',
  RECENT: 'RECENT',
  AI: 'AI',
};

export const useWorkoutsUIStore = create((set) => ({
  activeFilter: FILTERS.MY,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));

