import React from 'react';
import { 
  Globe, GraduationCap, Bot, Palette, Flame, Database, 
  CheckCircle2, ArrowRight, Clock, Tag 
} from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

const iconMap = {
  Globe: Globe,
  GraduationCap: GraduationCap,
  Bot: Bot,
  Palette: Palette,
  Flame: Flame,
  Database: Database,
};

export default function Services({ onSelectService }) {
  return (
    <section id="layanan" className="section-wrapper services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span>🛠️ KOBRAT EXPERTISE</span>
          </div>
          <h2 className="section-title">
            Bisa Garap Apa Aja? <span className="gradient-text">Hampir Semuanya.</span>
          </h2>
          <p className="section-desc">
            Dari tugas praktikum semester 1 sampai sistem startup skala penuh. Kodingan clean, terstruktur, siap pakai, dan bebas pusing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {KOBRAT_DATA.services.map((item) => {
            const IconComponent = iconMap[item.icon] || Globe;
            return (
              <div key={item.id} className="service-card glass-panel">
                {/* Header Card */}
                <div className="service-card-header">
                  <div className="service-icon-box">
                    <IconComponent size={24} className="service-icon" />
                  </div>
                  {item.badge && (
                    <span className={`service-badge badge-${item.id}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>

                {/* Tech Pills */}
                <div className="service-tech-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pricing & Duration */}
                <div className="service-meta-box">
                  <div className="meta-item">
                    <Tag size={15} className="meta-icon" />
                    <div>
                      <span className="meta-label">Mulai Dari</span>
                      <span className="meta-value highlight">{item.startingPrice}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <Clock size={15} className="meta-icon" />
                    <div>
                      <span className="meta-label">Estimasi Pengerjaan</span>
                      <span className="meta-value">{item.turnaround}</span>
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="service-feature-list">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="feature-item">
                      <CheckCircle2 size={16} className="feature-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectService(item.id)}
                  className="btn-secondary service-action-btn"
                >
                  <span>Pilih & Hitung Biaya</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
