import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, Terminal, ShieldCheck, Zap, Flame, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Home({ onOpenTerminal }) {
  const navigate = useNavigate();

  const techStacks = [
    "REACT", "NEXT.JS", "PYTHON", "LARAVEL", "TYPESCRIPT", 
    "FASTAPI", "NODE.JS", "DISCORD.JS", "FIGMA", "POSTGRESQL", 
    "FLUTTER", "DOCKER", "C++", "JAVA", "MONGODB"
  ];

  return (
    <div className="page-wrapper home-page">
      <div className="container">
        {/* iOS Dynamic Island Status Pill */}
        <div className="hero-top-badge">
          <div className="status-indicator">
            <span className="ping-dot"></span>
            <span>{KOBRAT_DATA.brand.status}</span>
          </div>
          <span className="hero-tag-secondary">⚡ Circle Tongkrongan Dev x Open Jasa</span>
        </div>

        {/* Main Hero Header */}
        <div className="hero-content-center">
          <h1 className="hero-title">
            Kodingan Amburadul? Deadline Mencekik?<br />
            <span className="gradient-text">Biar Anak KOBRAT yang Beresin.</span>
          </h1>

          <p className="hero-subtitle">
            Bukan agensi kaku berdasi. Kami <strong>circle tongkrongan dev</strong> yang siap jadi <em>carry</em> projek lu—dari tugas praktikum, skripsi, landing page startup, bot automasi, sampai full-stack app. Clean code, transparan, dan <strong>siap bimbingan Google Meet</strong>.
          </p>

          {/* Quick iOS Action Buttons */}
          <div className="hero-cta-group">
            <Link to="/calculator" className="btn-primary hero-btn">
              <Calculator size={18} />
              <span>Hitung Biaya Projek</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-secondary hero-btn">
              <span>Lihat Katalog Jasa</span>
            </Link>
            <button onClick={onOpenTerminal} className="btn-secondary hero-btn terminal-trigger">
              <Terminal size={17} />
              <span className="mono">CLI Shell</span>
            </button>
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

        {/* Quick Highlights Deck: Layanan Unggulan */}
        <div className="home-section-deck">
          <div className="deck-header">
            <div>
              <span className="section-tag">✨ LAYANAN UNGGULAN</span>
              <h2 className="deck-title">Paling Sering Digarap</h2>
            </div>
            <Link to="/services" className="deck-more-link">
              <span>Lihat Semua Layanan</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="home-services-grid">
            {KOBRAT_DATA.services.slice(0, 3).map((svc) => (
              <div key={svc.id} className="home-service-card glass-panel">
                <div className="card-top-row">
                  <span className="card-badge">{svc.badge}</span>
                  <span className="card-price mono">{svc.startingPrice}</span>
                </div>
                <h3 className="card-title">{svc.title}</h3>
                <p className="card-desc">{svc.desc}</p>
                <div className="card-tags">
                  {svc.tags.slice(0, 4).map((t, idx) => (
                    <span key={idx} className="tech-pill">{t}</span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/calculator?service=${svc.id}`)}
                  className="btn-secondary card-action-btn"
                >
                  <span>Hitung Estimasi Biaya</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Calculator Teaser Banner */}
        <div className="calc-banner glass-panel">
          <div className="calc-banner-left">
            <span className="section-tag">⚡ TRANSPARAN & ADIL</span>
            <h2 className="banner-title">Mau Tahu Berapa Biaya Projekmu?</h2>
            <p className="banner-desc">
              Gunakan kalkulator estimasi interaktif kami. Pilih jenis projek, tenggat waktu, dan add-ons (seperti sesi bimbingan kodingan via GMeet). Langsung generate format pesanan WhatsApp tanpa ribet!
            </p>
            <Link to="/calculator" className="btn-primary banner-btn">
              <Calculator size={18} />
              <span>Buka Kalkulator Biaya</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="calc-banner-right">
            <div className="quick-perks-box">
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Bisa DP 30% santai, pelunasan setelah cek hasil</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Bisa request kilat H-1 deadline</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Source code rapi & bergaransi revisi</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>100% privasi & identitas klien terjamin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Running Tech Marquee */}
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
    </div>
  );
}
