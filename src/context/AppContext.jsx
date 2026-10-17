import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kobrat_theme') || 'dark';
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kobrat_lang') || 'id';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kobrat_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('kobrat_lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const t = translations[lang] || translations.id;

  return (
    <AppContext.Provider value={{ theme, setTheme, toggleTheme, lang, setLang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
