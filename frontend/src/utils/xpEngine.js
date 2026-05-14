// Constants for Level progression
export const LEVEL_THRESHOLDS = [
  { level: 1, title: "Cricket Fan", minXp: 0, color: "text-gray-400" },
  { level: 2, title: "Stand Regular", minXp: 201, color: "text-gray-300" },
  { level: 3, title: "Pavilion Pro", minXp: 501, color: "text-yellow-400" },
  { level: 4, title: "Premier Legend", minXp: 1001, color: "text-blue-300" },
  { level: 5, title: "Hall of Famer", minXp: 2001, color: "text-purple-400" }
];

export const calculateLevel = (xp) => {
  let currentLevel = LEVEL_THRESHOLDS[0];
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold.minXp) {
      currentLevel = threshold;
    }
  }
  
  // Find next level
  const nextLevelIndex = LEVEL_THRESHOLDS.findIndex(t => t.level === currentLevel.level) + 1;
  const nextLevel = nextLevelIndex < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[nextLevelIndex] : null;
  
  return {
    ...currentLevel,
    nextLevel,
    progress: nextLevel ? ((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100 : 100
  };
};

export const XP_REWARDS = {
  CORRECT_PREDICTION: 50,
  WRONG_PREDICTION: 10,
  STREAK_BONUS_3: 50,
  STREAK_BONUS_7: 150,
  STREAK_BONUS_14: 300,
};
