// Local workouts dataset and simple API-like fetchers
// Provides: fetchMyWorkouts, fetchRecentWorkouts, fetchAIRecommended, fetchWorkoutCounts, getWorkoutById

const DEMO_USER_ID = '28d64dd0-bc6e-40a3-ae22-f109bb46d462';

// Helper to make a delay Promise
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Generate timestamps within N days
const daysAgo = (n) => Date.now() - n * 24 * 60 * 60 * 1000;

// Base dataset: at least 15 workouts across groups
// Fields: id, title, type, duration, exercises, difficulty, category, description, isAI, createdBy, lastAccessed
export const allWorkouts = [
  // My Workouts (created by current user)
  {
    id: 101,
    title: 'Push-Pull Strength',
    type: 'Personal',
    duration: '45 min',
    exercises: 8,
    difficulty: 'Intermediate',
    category: 'Strength',
    description: 'Balanced upper body push/pull routine.',
    isAI: false,
    createdBy: DEMO_USER_ID,
    lastAccessed: daysAgo(3),
  },
  {
    id: 102,
    title: 'Leg Day Builder',
    type: 'Personal',
    duration: '50 min',
    exercises: 7,
    difficulty: 'Intermediate',
    category: 'Strength',
    description: 'Lower body focus: quads, hamstrings, glutes.',
    isAI: false,
    createdBy: DEMO_USER_ID,
    lastAccessed: daysAgo(7),
  },
  {
    id: 103,
    title: 'Core Stability Flow',
    type: 'Personal',
    duration: '30 min',
    exercises: 10,
    difficulty: 'Beginner',
    category: 'Flexibility',
    description: 'Core activation and flexibility blend.',
    isAI: false,
    createdBy: DEMO_USER_ID,
    lastAccessed: daysAgo(18),
  },
  {
    id: 104,
    title: 'Morning Cardio Mix',
    type: 'Personal',
    duration: '35 min',
    exercises: 6,
    difficulty: 'Beginner',
    category: 'Cardio',
    description: 'Light cardio intervals to start the day.',
    isAI: false,
    createdBy: DEMO_USER_ID,
    lastAccessed: daysAgo(1),
  },
  {
    id: 105,
    title: 'Full Body Circuit',
    type: 'Personal',
    duration: '40 min',
    exercises: 9,
    difficulty: 'Intermediate',
    category: 'HIIT',
    description: 'Circuit style full body conditioning.',
    isAI: false,
    createdBy: DEMO_USER_ID,
    lastAccessed: daysAgo(10),
  },

  // Recent Workouts (ensure timestamp within 30 days)
  {
    id: 201,
    title: 'Tempo Run',
    type: 'Recent',
    duration: '30 min',
    exercises: 1,
    difficulty: 'Intermediate',
    category: 'Cardio',
    description: 'Steady tempo for aerobic conditioning.',
    isAI: false,
    createdBy: 'coach',
    lastAccessed: daysAgo(2),
  },
  {
    id: 202,
    title: 'Mobility Reset',
    type: 'Recent',
    duration: '20 min',
    exercises: 12,
    difficulty: 'Beginner',
    category: 'Flexibility',
    description: 'Joint-by-joint mobility sequence.',
    isAI: false,
    createdBy: 'coach',
    lastAccessed: daysAgo(5),
  },
  {
    id: 203,
    title: 'Kettlebell Complex',
    type: 'Recent',
    duration: '25 min',
    exercises: 6,
    difficulty: 'Advanced',
    category: 'Strength',
    description: 'Complexes for power and conditioning.',
    isAI: false,
    createdBy: 'coach',
    lastAccessed: daysAgo(8),
  },
  {
    id: 204,
    title: 'Sprint Intervals',
    type: 'Recent',
    duration: '22 min',
    exercises: 1,
    difficulty: 'Advanced',
    category: 'HIIT',
    description: 'High-intensity sprint intervals on track.',
    isAI: false,
    createdBy: 'coach',
    lastAccessed: daysAgo(12),
  },
  {
    id: 205,
    title: 'Rowing Pyramid',
    type: 'Recent',
    duration: '28 min',
    exercises: 1,
    difficulty: 'Intermediate',
    category: 'Cardio',
    description: 'Pyramid intervals on rower.',
    isAI: false,
    createdBy: 'coach',
    lastAccessed: daysAgo(15),
  },

  // AI Recommended Workouts
  {
    id: 301,
    title: 'AI Upper Body Blast',
    type: 'AI Recommended',
    duration: '45 min',
    exercises: 8,
    difficulty: 'Intermediate',
    category: 'Strength',
    description: 'Personalized upper body strength workout.',
    isAI: true,
    createdBy: 'ai',
    lastAccessed: daysAgo(14),
  },
  {
    id: 302,
    title: 'AI Flexibility Flow',
    type: 'AI Recommended',
    duration: '20 min',
    exercises: 12,
    difficulty: 'Beginner',
    category: 'Flexibility',
    description: 'Stretching routine adapted to your needs.',
    isAI: true,
    createdBy: 'ai',
    lastAccessed: daysAgo(20),
  },
  {
    id: 303,
    title: 'AI Full Body HIIT',
    type: 'AI Recommended',
    duration: '25 min',
    exercises: 10,
    difficulty: 'Advanced',
    category: 'HIIT',
    description: 'Intense full-body interval training.',
    isAI: true,
    createdBy: 'ai',
    lastAccessed: daysAgo(9),
  },
  {
    id: 304,
    title: 'AI Morning Cardio',
    type: 'AI Recommended',
    duration: '30 min',
    exercises: 6,
    difficulty: 'Beginner',
    category: 'Cardio',
    description: 'High-energy cardio to start your day.',
    isAI: true,
    createdBy: 'ai',
    lastAccessed: daysAgo(6),
  },
  {
    id: 305,
    title: 'AI Lower Body Power',
    type: 'AI Recommended',
    duration: '40 min',
    exercises: 9,
    difficulty: 'Intermediate',
    category: 'Strength',
    description: 'Build lower body strength and power.',
    isAI: true,
    createdBy: 'ai',
    lastAccessed: daysAgo(4),
  },
];

export const getWorkoutById = (id) =>
  allWorkouts.find((w) => String(w.id) === String(id)) || null;

// Simulated fetchers (with small artificial delay). In a real app, replace with API calls.
export async function fetchMyWorkouts(userId = DEMO_USER_ID) {
  await delay(50);
  return allWorkouts.filter((w) => w.createdBy === userId);
}

export async function fetchRecentWorkouts({ withinDays = 30 } = {}) {
  await delay(50);
  const cutoff = Date.now() - withinDays * 24 * 60 * 60 * 1000;
  return allWorkouts
    .filter((w) => typeof w.lastAccessed === 'number' && w.lastAccessed >= cutoff)
    .sort((a, b) => b.lastAccessed - a.lastAccessed);
}

export async function fetchAIRecommended() {
  await delay(50);
  return allWorkouts.filter((w) => w.isAI);
}

export async function fetchWorkoutCounts(userId = DEMO_USER_ID) {
  const [my, recent, ai] = await Promise.all([
    fetchMyWorkouts(userId),
    fetchRecentWorkouts({ withinDays: 30 }),
    fetchAIRecommended(),
  ]);
  return { my: my.length, recent: recent.length, ai: ai.length };
}

export const DIFFICULTY_COLORS = {
  Beginner: '#10B981',
  Intermediate: '#FFD700',
  Advanced: '#EF4444',
};
