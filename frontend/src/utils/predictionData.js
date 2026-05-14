export const PREDICTION_POOL = [
  { id: "q1", question: "Who will win the match?", options: ["RCB", "MI", "Tie"] },
  { id: "q2", question: "Who will score the most runs?", options: ["V. Kohli", "R. Sharma", "S. Yadav"] },
  { id: "q3", question: "Will there be a super over?", options: ["Yes", "No"] },
  { id: "q4", question: "Total runs in 1st Innings?", options: ["Under 160", "160-200", "Over 200"] },
  { id: "q5", question: "Who will take the most wickets?", options: ["J. Bumrah", "M. Siraj", "H. Pandya"] },
  { id: "q6", question: "How many sixes in the match?", options: ["0-10", "11-20", "21+"] },
  { id: "q7", question: "Will any player score a century?", options: ["Yes", "No"] },
  { id: "q8", question: "Who will hit the longest six?", options: ["G. Maxwell", "T. David", "R. Patidar"] },
  { id: "q9", question: "Method of first wicket?", options: ["Caught", "Bowled", "LBW", "Run Out"] },
  { id: "q10", question: "Runs scored in powerplay?", options: ["Under 45", "45-60", "Over 60"] },
  { id: "q11", question: "Will there be a maiden over?", options: ["Yes", "No"] },
  { id: "q12", question: "Which team will hit more boundaries?", options: ["RCB", "MI", "Tie"] },
  { id: "q13", question: "Total extras in the match?", options: ["0-10", "11-20", "Over 20"] },
  { id: "q14", question: "Will a spinner take the first wicket?", options: ["Yes", "No (Pacer/Run Out)"] },
  { id: "q15", question: "Who will have the best strike rate?", options: ["S. Yadav", "D. Karthik", "I. Kishan"] },
  { id: "q16", question: "Will any bowler take 4+ wickets?", options: ["Yes", "No"] },
  { id: "q17", question: "How many catches will be dropped?", options: ["0", "1-2", "3+"] },
  { id: "q18", question: "Who will face the first ball?", options: ["V. Kohli", "F. du Plessis", "R. Sharma"] },
  { id: "q19", question: "Will the match go to the last over?", options: ["Yes", "No"] },
  { id: "q20", question: "Highest individual score?", options: ["Under 50", "50-80", "Over 80"] }
];

export const getRandomQuestions = (count = 5) => {
  const shuffled = [...PREDICTION_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
