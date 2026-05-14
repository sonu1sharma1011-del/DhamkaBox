// Mock initial data for DhamkaBox

export const INITIAL_USER = {
  fan_id: "user-1234",
  username: "CricketFanatic_99",
  xp: 0,
  level: 1,
  level_title: "Cricket Fan",
  streak: 0,
  last_active: null,
  total_predictions: 0,
  correct_predictions: 0,
  badges: [],
  match_history: [],
  weekly_xp: 0
};

export const TODAY_MATCH = {
  id: "match-01",
  teamA: {
    name: "Royal Challengers Bengaluru",
    short: "RCB",
    color: "#E2231A"
  },
  teamB: {
    name: "Mumbai Indians",
    short: "MI",
    color: "#004BA0"
  },
  venue: "M. Chinnaswamy Stadium, Bengaluru",
  time: "7:30 PM IST",
  status: "UPCOMING"
};

export const LEADERBOARD_MOCK = [
  { rank: 1, name: "Rahul_Smash", xp: 4500, level_title: "Hall of Famer" },
  { rank: 2, name: "DhoniFan_07", xp: 4200, level_title: "Hall of Famer" },
  { rank: 3, name: "Viratian_18", xp: 3850, level_title: "Premier Legend" },
  { rank: 4, name: "Hitman_45", xp: 3600, level_title: "Premier Legend" },
  { rank: 5, name: "SKY_Limit", xp: 3100, level_title: "Premier Legend" },
  { rank: 6, name: "Boom_Boom", xp: 2800, level_title: "Pavilion Pro" },
  { rank: 7, name: "Sir_Jadeja", xp: 2500, level_title: "Pavilion Pro" },
  { rank: 8, name: "King_Kohli", xp: 2200, level_title: "Pavilion Pro" },
  { rank: 9, name: "Yorker_King", xp: 1900, level_title: "Stand Regular" },
  { rank: 10, name: "HelicopterShot", xp: 1600, level_title: "Stand Regular" }
];

export const LIVE_STATS = {
  highestRuns: "V. Kohli (78*)",
  mostWickets: "J. Bumrah (3/21)",
  mostSixes: "G. Maxwell (4)",
  mostFours: "R. Sharma (6)",
  hatrick: "None yet"
};
