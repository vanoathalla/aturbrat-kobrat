import React, { useState } from 'react';
import { Layers, ExternalLink, Code, CheckCircle } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'Semua Projek' },
    { id: 'web', label: 'Web & Fullstack' },
    { id: 'academic', label: 'Tugas & Skripsi' },
    { id: 'bot', label: 'Bot & Otomasi' },
    { id: 'uiux', label: 'UI/UX Design' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? KOBRAT_DATA.portfolio
    : KOBRAT_DATA.portfolio.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-wrapper portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Layers size={14} />
            <span>TRACK RECORD</span>
          </div>
          <h2 className="section-title">
            Karya & Projek <span className="gradient-text">Yang Pernah Dilibas</span>
          </h2>
          <p className="section-desc">
            Bukan sekadar teori. Berikut beberapa cuplikan projek klien, eksperimen circle, dan tugas akademik yang sukses tuntas dengan hasil memuaskan.
          </p>
        </div>

        {/* Filter Tabs */}
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

        {/* Project Cards Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card glass-panel">
              {/* Card Meta Top */}
              <div className="portfolio-card-top">
                <span className="portfolio-cat-tag">#{project.category.toUpperCase()}</span>
                <span className="portfolio-stats-pill">
                  <CheckCircle size={13} /> {project.stats}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="portfolio-title">{project.title}</h3>
              <p className="portfolio-desc">{project.desc}</p>

              {/* Tech Tags */}
              <div className="portfolio-tech-list">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="portfolio-tech-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
