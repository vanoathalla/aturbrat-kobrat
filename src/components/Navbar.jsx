import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Terminal, MessageSquare, Sun, Moon, Globe, Shield, ShieldCheck } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function Navbar({ onOpenTerminal, onShowToast }) {
  const { 
    theme, 
    toggleTheme, 
    lang, 
    toggleLang, 
    t, 
    isSlotOpen, 
    slotsCount,
    onlineMembersCount,
    isAdminAuthenticated
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const playing = ambientSynth.toggle();
    setIsPlayingAudio(playing);
    if (playing) {
      onShowToast?.(lang === 'id' ? "🎵 Lo-Fi Ambient Kobrat aktif ~ Selamat menikmati!" : "🎵 Lo-Fi Ambient Active ~ Enjoy the vibe!");
    } else {
      onShowToast?.(lang === 'id' ? "🔇 Lo-Fi Ambient dimatikan" : "🔇 Lo-Fi Ambient turned off");
    }
  };

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.calculator, path: "/calculator" },
    { label: t.nav.squad, path: "/squad" },
    { label: t.nav.portfolio, path: "/portfolio" },
    { label: t.nav.faq, path: "/faq" },
  ];

  const handlePresenceClick = () => {
    onShowToast?.(
      lang === 'id'
        ? `⚡ Status Tim: ${onlineMembersCount} dari 8 dev sedang aktif ngoding!`
        : `⚡ Team Status: ${onlineMembersCount} of 8 devs are currently online!`
    );
  };

  return (
    <header className="ios-navbar-wrapper">
      <div className="ios-dock-container">
        {/* Brand Logo */}
        <Link to="/" className="ios-brand">
          <div className="ios-logo-squircle">
            <span>🐍</span>
          </div>
          <div className="ios-brand-text">
            <span className="brand-title">KOBRAT</span>
            <span className="brand-dot"></span>
          </div>
        </Link>

        {/* iOS Segmented Navigation Bar (Desktop) */}
        <nav className="ios-segmented-control">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `ios-segment-item ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions Deck */}
        <div className="ios-actions-deck">
          {/* Live Presence Indicator */}
          <button
            onClick={handlePresenceClick}
            className="ios-action-pill presence-pill"
            title="Status Kehadiran Tim Kobrat"
          >
            <span className={`status-dot ${isSlotOpen ? 'online' : 'offline'}`}></span>
            <span className="action-label mono">{onlineMembersCount} Dev Aktif</span>
          </button>



          {/* Language Toggle (ID / EN) */}
          <button
            onClick={() => {
              toggleLang();
              onShowToast?.(lang === 'id' ? "🌐 Language switched to English" : "🌐 Bahasa diubah ke Indonesia");
            }}
            className="ios-action-pill lang-btn"
            title={lang === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <Globe size={14} />
            <span className="mono">{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={() => {
              toggleTheme();
              onShowToast?.(theme === 'dark' ? "☀️ Light Mode diaktifkan" : "🌙 Dark Mode diaktifkan");
            }}
            className="ios-action-pill theme-btn"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Lo-Fi Synth Toggle (Desktop) */}
          <button
            onClick={toggleAudio}
            className={`ios-action-pill audio-pill ${isPlayingAudio ? 'active' : ''}`}
            title="Toggle Lo-Fi Vibe"
          >
            {isPlayingAudio ? (
              <Volume2 size={15} className="audio-icon pulse" />
            ) : (
              <VolumeX size={15} />
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="ios-action-pill terminal-btn"
            title="Buka Terminal CLI (Ctrl+K)"
          >
            <Terminal size={14} />
            <span className="mono action-label">CLI</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Mau%20konsultasi%20projek%20kodingan%20dong`}
            target="_blank"
            rel="noopener noreferrer"
            className="ios-action-pill cta-btn"
          >
            <MessageSquare size={14} />
            <span className="action-label">{t.nav.chatWA}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="ios-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* iOS Style Mobile Sheet Menu */}
      {mobileMenuOpen && (
        <div className="ios-mobile-sheet">
          <div className="sheet-handle"></div>
          
          {/* Live Slot Status on Mobile */}
          <div className="sheet-slot-banner">
            <span className={`status-dot ${isSlotOpen ? 'online' : 'offline'}`}></span>
            <span className="mono">
              {isSlotOpen ? `OPEN SLOT (${slotsCount} Tersedia)` : 'FULL SLOT / WAITING LIST'}
            </span>
          </div>

          <div className="sheet-nav-list">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `sheet-nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="sheet-arrow">›</span>
              </NavLink>
            ))}



            {/* Mobile Actions: Lang, Theme, Audio */}
            <div className="sheet-actions-row">
              <button
                onClick={() => {
                  toggleLang();
                  onShowToast?.(lang === 'id' ? "🌐 Language: English" : "🌐 Bahasa: Indonesia");
                }}
                className="sheet-action-pill"
              >
                <Globe size={15} />
                <span>{lang.toUpperCase()}</span>
              </button>
              
              <button
                onClick={() => {
                  toggleTheme();
                  onShowToast?.(theme === 'dark' ? "☀️ Light Mode" : "🌙 Dark Mode");
                }}
                className="sheet-action-pill"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? "Light" : "Dark"}</span>
              </button>

              <button onClick={toggleAudio} className="sheet-action-pill">
                {isPlayingAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>Lo-Fi</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="sheet-nav-item mono-item"
            >
              <span>💻 Terminal KOBRAT CLI</span>
              <span className="sheet-arrow">›</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
