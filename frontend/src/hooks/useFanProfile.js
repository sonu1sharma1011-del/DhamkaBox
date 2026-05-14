import { useState, useEffect } from 'react';
import { INITIAL_USER } from '../utils/mockData';
import { calculateLevel } from '../utils/xpEngine';
import { checkBadges } from '../utils/badgeEngine';

export const useFanProfile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('dhamkabox_profile');
    const initialProfile = saved ? JSON.parse(saved) : INITIAL_USER;
    
    // Ensure badges are checked on load
    const missedBadges = checkBadges(initialProfile);
    if (missedBadges.length > 0) {
      initialProfile.badges = [...(initialProfile.badges || []), ...missedBadges];
      localStorage.setItem('dhamkabox_profile', JSON.stringify(initialProfile));
    }
    
    return initialProfile;
  });

  const [recentBadges, setRecentBadges] = useState([]);

  useEffect(() => {
    localStorage.setItem('dhamkabox_profile', JSON.stringify(profile));
  }, [profile]);

  const addXp = (amount) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      const levelInfo = calculateLevel(newXp);
      
      const newProfile = {
        ...prev,
        xp: newXp,
        level: levelInfo.level,
        level_title: levelInfo.title,
        weekly_xp: prev.weekly_xp + amount
      };

      const unlockedBadges = checkBadges(newProfile);
      if (unlockedBadges.length > 0) {
        newProfile.badges = [...prev.badges, ...unlockedBadges];
        setRecentBadges(unlockedBadges);
      }

      return newProfile;
    });
  };

  const updateStreak = (isActive) => {
    setProfile(prev => {
      const newStreak = isActive ? prev.streak + 1 : 0;
      const newProfile = { ...prev, streak: newStreak, last_active: new Date().toISOString() };
      
      const unlockedBadges = checkBadges(newProfile);
      if (unlockedBadges.length > 0) {
        newProfile.badges = [...prev.badges, ...unlockedBadges];
        setRecentBadges(unlockedBadges);
      }
      
      return newProfile;
    });
  };

  const clearRecentBadges = () => setRecentBadges([]);

  const levelInfo = calculateLevel(profile.xp);

  return { profile, levelInfo, addXp, updateStreak, recentBadges, clearRecentBadges, setProfile };
};
