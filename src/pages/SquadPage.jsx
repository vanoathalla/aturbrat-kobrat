import React from 'react';
import { Users, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function SquadPage() {
  const { t } = useApp();

  return (
    <div className="page-wrapper squad-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Users size={14} />
            <span>{t.squad.tag}</span>
          </div>
          <h1 className="section-title">
            {t.squad.title}<span className="gradient-text">{t.squad.titleHighlight}</span>
          </h1>
          <p className="section-desc">
            {t.squad.desc}
          </p>
        </div>

        {/* Squad Lore Box */}
        <div className="squad-lore-card glass-panel">
          <div className="lore-header">
            <span className="mono status-tag">{t.squad.manifestoTag}</span>
          </div>
          <p className="lore-text">
            {t.squad.manifestoText}
          </p>
        </div>

        {/* Squad Grid: 8 Members */}
        <div className="squad-grid">
          {KOBRAT_DATA.squad.map((member) => (
            <div key={member.id} className="squad-card glass-panel">
              {/* Photo & Live Status Banner */}
              <div className="squad-photo-frame">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="squad-member-photo"
                  loading="lazy"
                />
                <div className="squad-nickname-tag">
                  <span>{member.nickname}</span>
                </div>
                <div className="squad-status-floating">
                  <span className="ping-dot"></span>
                  <span>{member.status}</span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="squad-info">
                <h2 className="squad-name">{member.name}</h2>
                <span className="squad-role">{member.role}</span>
              </div>

              {/* Signature Quote */}
              <div className="squad-quote">
                <p>"{member.quote}"</p>
              </div>

              {/* Skills Tags */}
              <div className="squad-skills">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="squad-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer Profile Link */}
              <div className="squad-card-footer">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="squad-link-btn"
                  title="Lihat GitHub"
                >
                  <GithubIcon size={16} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
