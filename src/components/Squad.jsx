import React from 'react';
import { Users, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Squad() {
  return (
    <section id="squad" className="section-wrapper squad-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Users size={14} />
            <span>BEHIND THE CODE</span>
          </div>
          <h2 className="section-title">
            Kenalan Sama <span className="gradient-text">Squad KOBRAT</span>
          </h2>
          <p className="section-desc">
            Bukan sekadar partner koding, kami circle tongkrongan yang tiap hari riset tech stack baru, adu argumen tab vs space, dan siap jadi penyelamat deadline lu.
          </p>
        </div>

        {/* Squad Cards Grid */}
        <div className="squad-grid">
          {KOBRAT_DATA.squad.map((member) => (
            <div key={member.id} className="squad-card glass-panel">
              {/* Card Header with Avatar & Live Status */}
              <div className="squad-card-top">
                <div 
                  className="squad-avatar"
                  style={{ background: member.avatarBg }}
                >
                  <span className="avatar-initials">{member.name.charAt(0)}</span>
                </div>
                <div className="squad-status-badge">
                  <span>{member.status}</span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="squad-info">
                <h3 className="squad-name">{member.name}</h3>
                <span className="squad-role">{member.role}</span>
              </div>

              {/* Signature Quote */}
              <div className="squad-quote">
                <p>"{member.quote}"</p>
              </div>

              {/* Skills Tech Tags */}
              <div className="squad-skills">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="squad-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer Links */}
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
    </section>
  );
}
