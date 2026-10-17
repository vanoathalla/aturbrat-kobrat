import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, GraduationCap, Bot, Palette, Flame, Database, 
  CheckCircle2, ArrowRight, Clock, Tag 
} from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

const iconMap = {
  Globe,
  GraduationCap,
  Bot,
  Palette,
  Flame,
  Database,
};

export default function ServicesPage() {
  const { t } = useApp();
  const navigate = useNavigate();

  const handleChooseService = (serviceId) => {
    navigate(`/calculator?service=${serviceId}`);
  };

  return (
    <div className="page-wrapper services-page">
      <div className="container">
        {/* Page Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span>{t.services.tag}</span>
          </div>
          <h1 className="section-title">
            {t.services.title}<span className="gradient-text">{t.services.titleHighlight}</span>
          </h1>
          <p className="section-desc">
            {t.services.desc}
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
                <h2 className="service-title">{item.title}</h2>
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
                      <span className="meta-label">{t.services.startingFrom}</span>
                      <span className="meta-value highlight">{item.startingPrice}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <Clock size={15} className="meta-icon" />
                    <div>
                      <span className="meta-label">{t.services.duration}</span>
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
                  onClick={() => handleChooseService(item.id)}
                  className="btn-primary service-action-btn"
                >
                  <span>{t.services.btnChoose}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
