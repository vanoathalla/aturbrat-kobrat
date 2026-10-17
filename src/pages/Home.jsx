import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, Terminal, ChevronRight, CheckCircle2, Camera, MapPin, Calendar, Sparkles } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';
import { ARCHIVE_DATA } from '../data/archiveData';
import { useApp } from '../context/AppContext';

export default function Home({ onOpenTerminal }) {
  const { t, isSlotOpen, slotsCount } = useApp();
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
          <div className={`status-indicator ${isSlotOpen ? 'open' : 'full'}`}>
            <span className={`status-dot ${isSlotOpen ? 'online' : 'offline'}`}></span>
            <span>
              {isSlotOpen 
                ? `OPEN SLOT (${slotsCount} Slot Tersedia)` 
                : 'FULL SLOT (Waiting List)'}
            </span>
          </div>
          <span className="hero-tag-secondary">{t.hero.badge}</span>
        </div>

        {/* Main Hero Header: Collaborated Circle & Services */}
        <div className="hero-content-center">
          <h1 className="hero-title">
            {t.hero.titlePre}<br />
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>

          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>

          {/* Quick iOS Action Buttons */}
          <div className="hero-cta-group">
            <Link to="/calculator" className="btn-primary hero-btn">
              <Calculator size={18} />
              <span>{t.hero.btnCalc}</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/archive" className="btn-secondary hero-btn">
              <Camera size={18} className="camera-icon" />
              <span>{t.hero.btnVault}</span>
            </Link>
            <Link to="/services" className="btn-secondary hero-btn">
              <span>{t.hero.btnServices}</span>
            </Link>
            <button onClick={onOpenTerminal} className="btn-secondary hero-btn terminal-trigger">
              <Terminal size={17} />
              <span className="mono">{t.hero.btnCli}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid: Collaborated Circle & Project Stats */}
        <div className="stats-grid">
          {t.hero.stats.map((stat, idx) => (
            <div key={idx} className="stat-card glass-panel">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-desc">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* SECTION: Bukan Sekadar Jasa, Ini Tongkrongan Kami (Memories Teaser) */}
        <div className="home-vault-teaser glass-panel">
          <div className="vault-teaser-header">
            <div>
              <span className="section-tag">{t.hero.vaultTeaserTag}</span>
              <h2 className="deck-title">{t.hero.vaultTeaserTitle}</h2>
              <p className="vault-teaser-sub">{t.hero.vaultTeaserDesc}</p>
            </div>
            <Link to="/archive" className="btn-primary teaser-view-btn">
              <span>{t.hero.seeVault}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="vault-teaser-grid">
            {ARCHIVE_DATA.memories.slice(0, 3).map((item) => (
              <div key={item.id} className="teaser-polaroid-card" onClick={() => navigate('/archive')}>
                <div className="teaser-polaroid-img-wrap">
                  <img src={item.image} alt={item.title} className="teaser-img" />
                  <span className="teaser-polaroid-tag">#{item.category.toUpperCase()}</span>
                </div>
                <div className="teaser-polaroid-info">
                  <div className="teaser-meta">
                    <MapPin size={12} className="loc-icon" />
                    <span>{item.location}</span>
                  </div>
                  <h4 className="teaser-card-title">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Deck: Layanan Unggulan */}
        <div className="home-section-deck">
          <div className="deck-header">
            <div>
              <span className="section-tag">{t.hero.featuredTag}</span>
              <h2 className="deck-title">{t.hero.featuredTitle}</h2>
            </div>
            <Link to="/services" className="deck-more-link">
              <span>{t.hero.seeAll}</span>
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
                  {svc.tags.slice(0, 4).map((tTag, idx) => (
                    <span key={idx} className="tech-pill">{tTag}</span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/calculator?service=${svc.id}`)}
                  className="btn-secondary card-action-btn"
                >
                  <span>{t.hero.btnCalc}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Calculator Teaser Banner */}
        <div className="calc-banner glass-panel">
          <div className="calc-banner-left">
            <span className="section-tag">{t.hero.bannerTag}</span>
            <h2 className="banner-title">{t.hero.bannerTitle}</h2>
            <p className="banner-desc">
              {t.hero.bannerDesc}
            </p>
            <Link to="/calculator" className="btn-primary banner-btn">
              <Calculator size={18} />
              <span>{t.hero.bannerBtn}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="calc-banner-right">
            <div className="quick-perks-box">
              {t.hero.perks.map((perk, idx) => (
                <div key={idx} className="perk-item">
                  <CheckCircle2 size={18} className="perk-icon" />
                  <span>{perk}</span>
                </div>
              ))}
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
