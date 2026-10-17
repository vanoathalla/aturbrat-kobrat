import React, { useState } from 'react';
import { Layers, ExternalLink, Code, CheckCircle } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function PortfolioPage() {
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
    <div className="page-wrapper portfolio-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Layers size={14} />
            <span>PORTFOLIO & KARYA</span>
          </div>
          <h1 className="section-title">
            Track Record <span className="gradient-text">Yang Pernah Dilibas</span>
          </h1>
          <p className="section-desc">
            Cuplikan hasil pengerjaan projek nyata dari klien UMKM, komunitas, tugas praktikum, hingga skripsi yang lolos sidang dengan nilai maksimal.
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

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card glass-panel">
              <div className="portfolio-card-top">
                <span className="portfolio-cat-tag">#{project.category.toUpperCase()}</span>
                <span className="portfolio-stats-pill">
                  <CheckCircle size={13} /> {project.stats}
                </span>
              </div>

              <h2 className="portfolio-title">{project.title}</h2>
              <p className="portfolio-desc">{project.desc}</p>

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
    </div>
  );
}
