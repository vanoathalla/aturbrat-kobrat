import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { KOBRAT_DATA } from '../data/kobratData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kobrat_theme') || 'dark';
  });

  // Language: 'id' or 'en'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kobrat_lang') || 'id';
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('kobrat_admin_auth') === 'true';
  });

  // Slot Management State
  const [slotsCount, setSlotsCount] = useState(() => {
    const saved = localStorage.getItem('kobrat_slots_count');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  const [isSlotOpen, setIsSlotOpen] = useState(() => {
    const saved = localStorage.getItem('kobrat_slot_open');
    return saved !== null ? saved === 'true' : true;
  });

  // Squad Live Presence State (maps memberId to status)
  const [squadPresence, setSquadPresence] = useState(() => {
    const saved = localStorage.getItem('kobrat_squad_presence');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const initial = {};
    KOBRAT_DATA.squad.forEach((m, idx) => {
      initial[m.id] = {
        isOnline: idx === 0 || idx === 1 || idx === 6, // Aca, Plenger, Vano online by default
        status: m.status,
        activity: idx === 6 ? "Polishing Figma Prototypes" : "Ready for Projects",
        lastActive: "Baru saja",
      };
    });
    return initial;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kobrat_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('kobrat_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('kobrat_slots_count', slotsCount.toString());
  }, [slotsCount]);

  useEffect(() => {
    localStorage.setItem('kobrat_slot_open', isSlotOpen.toString());
  }, [isSlotOpen]);

  useEffect(() => {
    localStorage.setItem('kobrat_squad_presence', JSON.stringify(squadPresence));
  }, [squadPresence]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const loginAdmin = (passcode) => {
    // Default circle passcode: kobrat2026 or 1234
    if (passcode.trim() === 'kobrat2026' || passcode.trim() === '1234') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('kobrat_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('kobrat_admin_auth');
  };

  const updateMemberPresence = (memberId, { isOnline, status, activity }) => {
    setSquadPresence(prev => ({
      ...prev,
      [memberId]: {
        isOnline: isOnline !== undefined ? isOnline : prev[memberId]?.isOnline,
        status: status || prev[memberId]?.status,
        activity: activity !== undefined ? activity : prev[memberId]?.activity,
        lastActive: "Baru saja",
      },
    }));
  };

  const t = translations[lang] || translations.id;

  // Active online members count
  const onlineMembersCount = Object.values(squadPresence).filter(p => p.isOnline).length;

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        t,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        slotsCount,
        setSlotsCount,
        isSlotOpen,
        setIsSlotOpen,
        squadPresence,
        updateMemberPresence,
        onlineMembersCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
