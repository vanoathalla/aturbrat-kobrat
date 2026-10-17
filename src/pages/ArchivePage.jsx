import React, { useState } from 'react';
import { 
  Camera, Heart, MapPin, Calendar, Sparkles, Flame, 
  Code2, CheckCircle, Quote, Music, X, ZoomIn 
} from 'lucide-react';
import { ARCHIVE_DATA } from '../data/archiveData';
import { useApp } from '../context/AppContext';

export default function ArchivePage() {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');
  const [likesState, setLikesState] = useState(() => {
    const saved = localStorage.getItem('kobrat_archive_likes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const initial = {};
    ARCHIVE_DATA.memories.forEach(m => { initial[m.id] = m.likes; });
    return initial;
  });

  const [activeLightbox, setActiveLightbox] = useState(null);

  const handleLike = (id, e) => {
    e.stopPropagation();
    const next = { ...likesState, [id]: (likesState[id] || 0) + 1 };
    setLikesState(next);
    localStorage.setItem('kobrat_archive_likes', JSON.stringify(next));
  };

  const filterOptions = [
    { id: 'all', label: t.vaultPage.filterAll },
    { id: 'warkop', label: t.vaultPage.filterWarkop },
    { id: 'koding', label: t.vaultPage.filterKoding },
    { id: 'kampus', label: t.vaultPage.filterKampus },
  ];

  const filteredMemories = activeFilter === 'all'
    ? ARCHIVE_DATA.memories
    : ARCHIVE_DATA.memories.filter(m => m.category === activeFilter);

  const milestoneIcons = {
    Sparkles,
    Flame,
    Code2,
    CheckCircle,
  };

  return (
    <div className="page-wrapper archive-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Camera size={14} />
            <span>{t.vaultPage.tag}</span>
          </div>
          <h1 className="section-title">
            {t.vaultPage.title}<span className="gradient-text">{t.vaultPage.titleHighlight}</span>
          </h1>
          <p className="section-desc">
            {t.vaultPage.desc}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="portfolio-filter-bar">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Polaroid Memory Grid */}
        <div className="polaroid-grid">
          {filteredMemories.map((mem) => {
            const count = likesState[mem.id] || mem.likes;
            return (
              <div 
                key={mem.id} 
                className="polaroid-card glass-panel"
                onClick={() => setActiveLightbox(mem)}
              >
                {/* Polaroid Photo Frame */}
                <div className="polaroid-image-frame">
                  <img src={mem.image} alt={mem.title} className="polaroid-img" />
                  <div className="polaroid-zoom-overlay">
                    <ZoomIn size={24} className="zoom-icon" />
                  </div>
                  <div className="polaroid-date-badge">
                    <Calendar size={12} />
                    <span>{mem.date}</span>
                  </div>
                </div>

                {/* Caption & Location */}
                <div className="polaroid-body">
                  <div className="polaroid-location">
                    <MapPin size={13} className="loc-icon" />
                    <span>{mem.location}</span>
                  </div>

                  <h3 className="polaroid-title">{mem.title}</h3>
                  <p className="polaroid-caption">{mem.caption}</p>

                  <div className="polaroid-footer">
                    <button
                      type="button"
                      onClick={(e) => handleLike(mem.id, e)}
                      className="polaroid-like-btn"
                      title="Suka momen ini"
                    >
                      <Heart size={16} className="heart-icon pulse" fill="#e11d48" color="#e11d48" />
                      <span className="mono">{count}</span>
                    </button>
                    <span className="polaroid-tag mono">#{mem.category.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 2: Milestone Journey Timeline */}
        <div className="milestone-section">
          <div className="section-header-center">
            <h2 className="timeline-section-title">{t.vaultPage.timelineTitle}</h2>
            <p className="timeline-section-sub">{t.vaultPage.timelineSub}</p>
          </div>

          <div className="timeline-tree">
            {ARCHIVE_DATA.milestones.map((item, idx) => {
              const IconComp = milestoneIcons[item.icon] || Sparkles;
              return (
                <div key={idx} className="timeline-node glass-panel">
                  <div className="node-year-badge">
                    <span className="mono">{item.year}</span>
                  </div>
                  <div className="node-content">
                    <div className="node-title-row">
                      <IconComp size={18} className="node-icon" />
                      <h3 className="node-title">{item.title}</h3>
                    </div>
                    <p className="node-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Hall of Inside Jokes */}
        <div className="inside-jokes-section">
          <div className="section-header-center">
            <h2 className="timeline-section-title">{t.vaultPage.jokesTitle}</h2>
            <p className="timeline-section-sub">{t.vaultPage.jokesSub}</p>
          </div>

          <div className="jokes-grid">
            {ARCHIVE_DATA.insideJokes.map((joke, idx) => (
              <div key={idx} className="joke-card glass-panel">
                <Quote size={20} className="joke-quote-icon" />
                <p className="joke-text">"{joke.quote}"</p>
                <div className="joke-footer">
                  <span className="joke-author">{joke.author}</span>
                  <span className="joke-context">({joke.context})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {activeLightbox && (
        <div className="lightbox-overlay" onClick={() => setActiveLightbox(null)}>
          <div className="lightbox-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveLightbox(null)}>
              <X size={20} />
            </button>
            <div className="lightbox-image-box">
              <img src={activeLightbox.image} alt={activeLightbox.title} className="lightbox-img" />
            </div>
            <div className="lightbox-info">
              <div className="polaroid-location">
                <MapPin size={14} className="loc-icon" />
                <span>{activeLightbox.location} • {activeLightbox.date}</span>
              </div>
              <h3 className="lightbox-title">{activeLightbox.title}</h3>
              <p className="lightbox-caption">{activeLightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
