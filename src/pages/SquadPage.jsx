import React from 'react';
import { Users, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { KOBRAT_DATA } from '../data/kobratData';

export default function SquadPage() {
  return (
    <div className="page-wrapper squad-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Users size={14} />
            <span>THE CREW</span>
          </div>
          <h1 className="section-title">
            Kenalan Sama <span className="gradient-text">Squad KOBRAT</span>
          </h1>
          <p className="section-desc">
            Bukan sekadar koder individu. Kami circle tongkrongan yang tiap hari barengan ngebahas tech stack baru, adu argumen tab vs space, dan siap jadi carry deadline lu.
          </p>
        </div>

        {/* Squad Lore Box */}
        <div className="squad-lore-card glass-panel">
          <div className="lore-header">
            <span className="mono status-tag">📜 THE KOBRAT MANIFESTO</span>
          </div>
          <p className="lore-text">
            Berawal dari server Discord kecil tempat sambat tugas ngoding dan begadang bareng, Kobrat bertransformasi jadi sindikat dev solid. Filosofi kita simpel: <em>"Kodingan lu adalah kodingan kita—rapi, anti-drama, dan selalu siap dibedah bareng biar lu paham luar dalem."</em>
          </p>
        </div>

        {/* Squad Grid */}
        <div className="squad-grid">
          {KOBRAT_DATA.squad.map((member) => (
            <div key={member.id} className="squad-card glass-panel">
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

              <div className="squad-info">
                <h2 className="squad-name">{member.name}</h2>
                <span className="squad-role">{member.role}</span>
              </div>

              <div className="squad-quote">
                <p>"{member.quote}"</p>
              </div>

              <div className="squad-skills">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="squad-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

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
