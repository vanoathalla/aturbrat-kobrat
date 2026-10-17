import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Terminal, MessageSquare, Sparkles } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Navbar({ onOpenTerminal, onShowToast }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const playing = ambientSynth.toggle();
    setIsPlayingAudio(playing);
    if (playing) {
      onShowToast?.("🎵 Lo-Fi Ambient Kobrat aktif ~ Chill & selamat menikmati!");
    } else {
      onShowToast?.("🔇 Lo-Fi Ambient dimatikan");
    }
  };

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Layanan", path: "/services" },
    { label: "Kalkulator", path: "/calculator" },
    { label: "The Squad", path: "/squad" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "FAQ", path: "/faq" },
  ];

  return (
    <header className="ios-navbar-wrapper">
      <div className="ios-dock-container">
        {/* Brand Logo with red specular glow */}
        <Link to="/" className="ios-brand">
          <div className="ios-logo-squircle">
            <span>🐍</span>
          </div>
          <div className="ios-brand-text">
            <span className="brand-title">KOBRAT</span>
            <span className="brand-dot"></span>
          </div>
        </Link>

        {/* iOS Segmented Navigation Bar */}
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

        {/* Actions Deck: Audio toggle, CLI, WA */}
        <div className="ios-actions-deck">
          {/* Lo-Fi Synth Toggle */}
          <button
            onClick={toggleAudio}
            className={`ios-action-pill ${isPlayingAudio ? 'active' : ''}`}
            title="Toggle Lo-Fi Vibe"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 size={15} className="audio-icon pulse" />
                <span className="action-label">Lo-Fi</span>
              </>
            ) : (
              <>
                <VolumeX size={15} />
                <span className="action-label">Lo-Fi</span>
              </>
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="ios-action-pill terminal-btn"
            title="Buka Terminal CLI (Ctrl+K)"
          >
            <Terminal size={14} />
            <span className="mono">CLI</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Mau%20konsultasi%20projek%20kodingan%20dong`}
            target="_blank"
            rel="noopener noreferrer"
            className="ios-action-pill cta-btn"
          >
            <MessageSquare size={14} />
            <span>Chat WA</span>
          </a>

          {/* Mobile Menu Button */}
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="sheet-nav-item mono-item"
            >
              <span>⚡ Terminal KOBRAT CLI</span>
              <span className="sheet-arrow">›</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
