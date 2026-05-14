export const BADGES = [
  { id: "first_blood", name: "First Blood", description: "First prediction made", icon: "🏏" },
  { id: "on_fire", name: "On Fire", description: "3 day streak", icon: "🔥" },
  { id: "week_warrior", name: "Week Warrior", description: "7 day streak", icon: "⚔️" },
  { id: "sharp_shooter", name: "Sharp Shooter", description: "5 correct predictions in a row", icon: "🎯" },
  { id: "mastermind", name: "Mastermind", description: "10 correct predictions total", icon: "🧠" },
  { id: "champion", name: "Champion", description: "Reach Level 4", icon: "🏆" },
  { id: "dhamaka", name: "Dhamaka!", description: "Score 100 XP in one match day", icon: "⚡" },
  { id: "hall_of_famer", name: "Hall of Famer", description: "Reach Level 5", icon: "🌟" }
];

export const checkBadges = (profile) => {
  const newBadges = [];
  const currentBadges = profile.badges || [];
  
  const addBadge = (id) => {
    if (!currentBadges.includes(id)) newBadges.push(id);
  }

  if (profile.total_predictions > 0) addBadge("first_blood");
  if (profile.streak >= 3) addBadge("on_fire");
  if (profile.streak >= 7) addBadge("week_warrior");
  if (profile.correct_predictions >= 10) addBadge("mastermind");
  if (profile.level >= 4) addBadge("champion");
  if (profile.level >= 5) addBadge("hall_of_famer");
  // Some badges like sharp shooter and dhamaka would need match history analysis
  
  return newBadges;
};
