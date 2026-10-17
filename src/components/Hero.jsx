import React from 'react';
import { ArrowRight, Calculator, Terminal, Zap, ShieldCheck, Flame } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Hero({ onOpenTerminal }) {
  const techStacks = [
    "REACT", "NEXT.JS", "PYTHON", "LARAVEL", "TYPESCRIPT", 
    "FASTAPI", "NODE.JS", "DISCORD.JS", "FIGMA", "POSTGRESQL", 
    "FLUTTER", "DOCKER", "C++", "JAVA", "MONGODB"
  ];

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Status Pill */}
        <div className="hero-badge-wrap">
          <div className="status-indicator">
            <span className="ping-dot"></span>
            <span>{KOBRAT_DATA.brand.status}</span>
          </div>
          <span className="hero-tag-secondary">⚡ Anti Ribet & 100% Sat-Set</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Kodingan Amburadul? Deadline Mencekik?<br />
          <span className="gradient-text">Biar Anak KOBRAT yang Beresin.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Bukan agensi kaku berdasi. Kami <strong>circle tongkrongan dev</strong> yang siap jadi <em>carry</em> projek lu—mulai dari tugas praktikum, skripsi, landing page startup, bot automasi, sampai full-stack app. Clean code, transparan, dan <strong>siap diajarin sampe paham</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <a href="#kalkulator" className="btn-primary hero-btn">
            <Calculator size={18} />
            <span>Hitung Estimasi Biaya</span>
            <ArrowRight size={16} />
          </a>
          <button onClick={onOpenTerminal} className="btn-secondary hero-btn">
            <Terminal size={18} />
            <span>Coba Terminal CLI Kobrat</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <ShieldCheck size={18} className="trust-icon" />
            <span>Garansi Privasi & Revisi</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <Zap size={18} className="trust-icon" />
            <span>Bisa Express H-1 Deadline</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <Flame size={18} className="trust-icon" />
            <span>Sesi Bedah Kode via GMeet</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {KOBRAT_DATA.stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-desc">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Running Tech Stack Marquee */}
      <div className="ticker-wrap">
        <div className="ticker-move">
          {[...techStacks, ...techStacks].map((tech, idx) => (
            <div key={idx} className="ticker-item">
              <span className="accent">#</span>
              <span>{tech}</span>
              <span className="ticker-dot">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
