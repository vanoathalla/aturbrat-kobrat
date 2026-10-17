import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles, MessageSquare } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Navbar({ onOpenTerminal, onShowToast }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const playing = ambientSynth.toggle();
    setIsPlayingAudio(playing);
    if (playing) {
      onShowToast?.("🎵 Lo-Fi Ambient Kobrat dinyalakan ~ Chill & enjoy the vibe!");
    } else {
      onShowToast?.("🔇 Lo-Fi Ambient dimatikan");
    }
  };

  const navLinks = [
    { label: "Layanan", href: "#layanan" },
    { label: "Kalkulator", href: "#kalkulator" },
    { label: "The Squad", href: "#squad" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo">
          <div className="logo-badge">
            <span className="logo-icon">🐍</span>
          </div>
          <div className="brand-info">
            <span className="brand-name">KOBRAT</span>
            <span className="brand-sub">// dev_syndicate</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((item, idx) => (
            <a key={idx} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Audio Toggle, Terminal Button & CTA */}
        <div className="nav-actions">
          {/* Ambient Lo-Fi Synthesizer Button */}
          <button
            onClick={toggleAudio}
            className={`audio-toggle-btn ${isPlayingAudio ? 'active' : ''}`}
            title={isPlayingAudio ? "Matikan musik lo-fi" : "Nyalakan musik lo-fi ambient tongkrongan"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 size={16} className="audio-icon pulse" />
                <span className="audio-label">Lo-Fi ON</span>
                <span className="sound-wave">
                  <i></i><i></i><i></i>
                </span>
              </>
            ) : (
              <>
                <VolumeX size={16} className="audio-icon" />
                <span className="audio-label">Lo-Fi Ambience</span>
              </>
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="terminal-nav-btn"
            title="Buka Terminal Kobrat"
          >
            <Terminal size={15} />
            <span className="mono">CLI</span>
          </button>

          {/* WhatsApp / Konsul CTA */}
          <a
            href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Mau%20konsultasi%20projek%20kodingan%20dong`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary nav-cta"
          >
            <MessageSquare size={16} />
            <span>Gas Konsul</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-list">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="mobile-nav-item mono"
            >
              <Terminal size={16} /> Buka Terminal KOBRAT
            </button>
            <div className="mobile-drawer-footer">
              <a
                href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Mau%20konsultasi%20projek%20kodingan%20dong`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare size={16} />
                <span>Gas Konsul via WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
