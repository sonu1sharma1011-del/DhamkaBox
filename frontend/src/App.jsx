import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFanProfile } from './hooks/useFanProfile';
import { TODAY_MATCH, LIVE_STATS } from './utils/mockData';
import { getRandomQuestions } from './utils/predictionData';
import { XP_REWARDS } from './utils/xpEngine';
import { Flame, Trophy, ChevronRight, Lock, Target, Brain, Zap, Star, Shield, Medal, Award, Crown, RefreshCw } from 'lucide-react';

const BadgeIcon = ({ id, className = "" }) => {
  const icons = {
    first_blood: Target,
    on_fire: Flame,
    week_warrior: Shield,
    sharp_shooter: Target,
    mastermind: Brain,
    champion: Trophy,
    dhamaka: Zap,
    hall_of_famer: Star,
    default: Award
  };
  const Icon = icons[id] || icons.default;
  return <Icon className={className} />;
};

const Header = ({ profile, levelInfo }) => (
  <header className="flex justify-between items-center p-4 bg-dbox-card border-b border-gray-800 sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <Zap className="text-dbox-yellow h-8 w-8" />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-dbox-yellow to-dbox-pink bg-clip-text text-transparent">
        DhamkaBox
      </h1>
    </div>
    
      <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
        <Flame className={`h-5 w-5 ${profile.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-500'}`} />
        <span className="font-bold">{profile.streak}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DhamkaFan" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-dbox-pink" />
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${levelInfo.color}`}>{levelInfo.title}</span>
            <span className="text-sm bg-dbox-purple px-2 py-0.5 rounded text-white font-mono">
              Lvl {levelInfo.level}
            </span>
          </div>
          <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-dbox-purple via-dbox-pink to-dbox-yellow transition-all duration-500"
              style={{ width: `${levelInfo.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const MatchCard = ({ onPredictClick, predictionsMade }) => (
  <section className="p-6">
    <div className="bg-gradient-to-br from-dbox-card to-dbox-purple p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-dbox-pink/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="flex justify-between items-center relative z-10">
        <span className="text-dbox-yellow text-sm font-bold tracking-wider uppercase">Today's Match</span>
        <span className="text-gray-400 text-sm flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          {TODAY_MATCH.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="w-20 h-20 rounded-full border-4 border-red-500/30 flex items-center justify-center bg-gray-900 text-3xl font-bold">
            {TODAY_MATCH.teamA.short}
          </div>
          <span className="font-medium text-gray-300 text-center">{TODAY_MATCH.teamA.name}</span>
        </div>
        
        <div className="flex flex-col items-center w-1/3">
          <div className="text-3xl font-black italic text-gray-500 mb-1">VS</div>
          <div className="text-xs text-gray-400">{TODAY_MATCH.time}</div>
          <div className="text-xs text-gray-500 text-center">{TODAY_MATCH.venue}</div>
        </div>
        
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="w-20 h-20 rounded-full border-4 border-blue-500/30 flex items-center justify-center bg-gray-900 text-3xl font-bold">
            {TODAY_MATCH.teamB.short}
          </div>
          <span className="font-medium text-gray-300 text-center">{TODAY_MATCH.teamB.name}</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800/50 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Highest Run</div>
          <div className="font-bold text-sm text-dbox-yellow">{LIVE_STATS.highestRuns}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Most Wickets</div>
          <div className="font-bold text-sm text-dbox-pink">{LIVE_STATS.mostWickets}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Most Sixes</div>
          <div className="font-bold text-sm text-white">{LIVE_STATS.mostSixes}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Most Fours</div>
          <div className="font-bold text-sm text-white">{LIVE_STATS.mostFours}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Hat-trick</div>
          <div className="font-bold text-sm text-gray-300">{LIVE_STATS.hatrick}</div>
        </div>
      </div>

      {predictionsMade && (
        <div className="mt-8 bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Win Probability (Based on Facts)</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden">
            <div className="bg-red-500 flex items-center justify-start px-2 text-[10px] font-bold text-white" style={{ width: '55%' }}>55%</div>
            <div className="bg-blue-500 flex items-center justify-end px-2 text-[10px] font-bold text-white" style={{ width: '45%' }}>45%</div>
          </div>
        </div>
      )}
      
      {!predictionsMade ? (
        <button 
          onClick={onPredictClick}
          className="w-full mt-8 py-4 bg-dbox-yellow text-black font-black text-lg rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(255,230,0,0.3)]"
        >
          MAKE YOUR PREDICTIONS
        </button>
      ) : (
        <div className="mt-6 py-3 bg-green-900/20 border border-green-500/30 text-green-400 rounded-xl flex items-center justify-center gap-2 font-bold">
          <Target className="w-5 h-5" /> Predictions Locked! Watch the match to see how you score.
        </div>
      )}
    </div>
  </section>
);

const PredictionArena = ({ questions, onPredict, onBackToMatch }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedCurrent, setSubmittedCurrent] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/personalise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: [],
            current_match: TODAY_MATCH
          })
        });
        const data = await response.json();
        setAiInsight(data);
      } catch (e) {
        console.error("Failed to fetch AI insight", e);
        setAiInsight({
            insight: "You usually predict batting heavy teams to win.",
            suggested_prediction: "RCB has a strong batting lineup tonight.",
            confidence_tip: "Take 'Over 200' for total runs based on the venue."
        });
      }
      setLoading(false);
    };
    fetchInsight();
  }, []);

  const handleSelect = (qId, option) => {
    if (!submittedCurrent) {
      setAnswers(prev => ({ ...prev, [qId]: option }));
    }
  };

  const handleSingleSubmit = () => {
    if (answers[currentQ.id]) {
      setSubmittedCurrent(true);
    }
  };

  const handleNextChallenge = () => {
    setSubmittedCurrent(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleBackToMatch = () => {
    // If all done, we can optionally submit all to parent or parent handles it on unmount.
    // The prompt says just navigate back.
    onBackToMatch();
  };

  const isFinished = currentQuestionIndex >= questions.length;
  const currentQ = questions[currentQuestionIndex];

  return (
    <section className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6" id="arena">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Target className="text-dbox-pink" /> 
          Prediction Arena
        </h2>
        
        {isFinished ? (
          <div className="bg-dbox-card p-8 rounded-xl border border-gray-800 text-center">
            <Trophy className="text-dbox-yellow w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">All predictions made!</h3>
            <p className="text-gray-400 mb-6">Check back at next match to earn more XP.</p>
            <button 
              onClick={() => { onPredict(answers); onBackToMatch(); }}
              className="px-6 py-3 rounded-lg border-2 border-dbox-yellow text-dbox-yellow bg-dbox-dark hover:bg-gray-900 font-bold transition-colors"
            >
              Back to Match
            </button>
          </div>
        ) : (
          <div className="bg-dbox-card p-5 rounded-xl border border-gray-800">
            <h3 className="font-medium mb-4 text-lg">{currentQ.question}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelect(currentQ.id, opt)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    answers[currentQ.id] === opt 
                      ? 'bg-dbox-purple border-2 border-dbox-pink text-white shadow-[0_0_15px_rgba(255,0,102,0.3)]' 
                      : 'bg-gray-800 border-2 border-transparent text-gray-400 hover:bg-gray-700'
                  } ${submittedCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={submittedCurrent}
                >
                  {opt}
                </button>
              ))}
            </div>
            
            {!submittedCurrent ? (
              <button 
                onClick={handleSingleSubmit}
                disabled={!answers[currentQ.id]}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  answers[currentQ.id]
                    ? 'bg-dbox-pink text-white hover:bg-pink-600 shadow-[0_0_20px_rgba(255,0,102,0.4)]'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                SUBMIT PREDICTION
              </button>
            ) : (
              <div className="mt-6 flex flex-col items-center">
                <div className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Prediction Saved!
                </div>
                <div className="flex items-center gap-[12px]">
                  <button 
                    onClick={handleBackToMatch}
                    className="px-6 py-3 rounded-lg border-2 border-dbox-yellow text-dbox-yellow bg-dbox-dark hover:bg-gray-900 font-bold transition-colors"
                  >
                    Back to Match
                  </button>
                  <button 
                    onClick={handleNextChallenge}
                    className="px-6 py-3 rounded-lg bg-dbox-yellow text-black hover:bg-yellow-400 font-bold transition-colors"
                  >
                    Next Challenge
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gradient-to-b from-dbox-purple/50 to-dbox-card p-6 rounded-2xl border border-dbox-purple relative overflow-hidden h-full">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain size={120} />
           </div>
           
           <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-dbox-yellow relative z-10">
            <SparklesIcon /> AI Coach
          </h2>

          {loading ? (
             <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
             </div>
          ) : aiInsight ? (
            <div className="space-y-6 relative z-10">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                <p className="text-sm text-gray-400 mb-1">Insight</p>
                <p className="font-medium text-gray-200">{aiInsight.insight}</p>
              </div>
              <div className="bg-dbox-purple/30 p-4 rounded-lg border border-dbox-purple">
                <p className="text-sm text-dbox-pink mb-1">Suggestion</p>
                <p className="font-medium text-white">{aiInsight.suggested_prediction}</p>
              </div>
               <div className="bg-dbox-yellow/10 p-4 rounded-lg border border-dbox-yellow/30">
                <p className="text-sm text-dbox-yellow mb-1">Tip</p>
                <p className="font-medium text-yellow-100">{aiInsight.confidence_tip}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
  </svg>
)

export default function App() {
  const { profile, levelInfo, addXp, updateStreak } = useFanProfile();
  const [questions, setQuestions] = useState([]);
  const [showArena, setShowArena] = useState(false);
  const [predictionsMade, setPredictionsMade] = useState(false);
  const [showXpToast, setShowXpToast] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions(5));
  }, []);

  const handlePredictClick = () => {
    setShowArena(true);
    setTimeout(() => {
      document.getElementById('arena')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRefreshPredictions = () => {
    setQuestions(getRandomQuestions(5));
    setPredictionsMade(false);
    setShowArena(true);
  };

  const handleBackToMatch = () => {
    setShowArena(false);
  };

  const handlePredictionsSubmit = (answers) => {
    console.log("Predictions submitted:", answers);
    setPredictionsMade(true);
    setShowArena(false);
    updateStreak(true);
    
    // Simulate some instant XP for making predictions
    addXp(20);
    setShowXpToast(true);
    setTimeout(() => setShowXpToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-dbox-dark text-white font-sans selection:bg-dbox-pink selection:text-white pb-20">
      <Header profile={profile} levelInfo={levelInfo} />
      
      <main className="max-w-7xl mx-auto">
        <MatchCard onPredictClick={handlePredictClick} predictionsMade={predictionsMade} />
        
        {predictionsMade && !showArena && (
          <div className="flex justify-center mt-4 mb-8">
            <button 
              onClick={handleRefreshPredictions}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-dbox-purple border border-dbox-pink text-white hover:bg-opacity-80 transition-all shadow-[0_0_15px_rgba(255,0,102,0.3)] font-bold"
            >
              <RefreshCw className="w-5 h-5" /> Get New Predictions
            </button>
          </div>
        )}

        {showArena && !predictionsMade && (
          <PredictionArena questions={questions} onPredict={handlePredictionsSubmit} onBackToMatch={handleBackToMatch} />
        )}
        
        {/* Profile & Badges Section */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dbox-card rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-dbox-yellow"/> Badges Earned
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    {/* Mock badges display */}
                    {[1,2,3,4,5,6,7,8].map(i => {
                        const isUnlocked = profile.badges?.length >= i;
                        return (
                            <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 border ${isUnlocked ? 'bg-dbox-purple/30 border-dbox-purple text-dbox-pink' : 'bg-gray-900 border-gray-800 text-gray-700'}`}>
                                {isUnlocked ? <BadgeIcon id="default" className="w-8 h-8" /> : <Lock className="w-6 h-6" />}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="bg-dbox-card rounded-2xl p-6 border border-gray-800">
                 <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Flame className="text-orange-500"/> Streak Progress
                </h3>
                <div className="relative pt-8 pb-4">
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full -translate-y-1/2 transition-all" style={{ width: `${Math.min((profile.streak / 30) * 100, 100)}%` }}></div>
                    
                    <div className="flex justify-between relative z-10 px-2 text-sm font-bold text-gray-500">
                        <span className={profile.streak >= 3 ? 'text-orange-400' : ''}>3</span>
                        <span className={profile.streak >= 7 ? 'text-orange-400' : ''}>7</span>
                        <span className={profile.streak >= 14 ? 'text-orange-400' : ''}>14</span>
                        <span className={profile.streak >= 30 ? 'text-orange-400' : ''}>30</span>
                    </div>
                </div>
                {profile.streak >= 3 ? (
                  <p className="text-center text-dbox-yellow mt-4 text-sm font-bold">"On Fire" badge unlocked! Keep your streak going!</p>
                ) : (
                  <p className="text-center text-gray-400 mt-4 text-sm">
                    Play {3 - profile.streak} more day{3 - profile.streak === 1 ? '' : 's'} to unlock the "On Fire" badge!
                  </p>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                  <div className="text-gray-400 text-sm">Prediction Accuracy</div>
                  <div className="font-bold text-lg text-dbox-pink">
                    {profile.total_predictions > 0 
                      ? Math.round((profile.correct_predictions / profile.total_predictions) * 100) 
                      : 0}%
                  </div>
                </div>
            </div>
        </section>
      </main>

      {/* Floating Chat Widget Button (Cosmetic for now) */}
      <button className="fixed bottom-6 right-6 bg-dbox-purple p-4 rounded-full shadow-[0_0_20px_rgba(26,5,51,0.5)] border border-dbox-pink text-white hover:scale-110 transition-transform">
        <SparklesIcon />
      </button>

      <AnimatePresence>
        {showXpToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 z-50"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Zap className="text-yellow-300" />
            </div>
            <div>
              <p className="text-sm opacity-90">Predictions Made</p>
              <p className="text-xl">+20 XP Earned!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
