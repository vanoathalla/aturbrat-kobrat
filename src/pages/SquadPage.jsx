import React from 'react';
import { Users, ExternalLink, Code2, Sparkles, Terminal, Activity, Settings2 } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function SquadPage() {
  const { t, squadPresence, setIsPresenceModalOpen, onlineMembersCount } = useApp();

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

          {/* Quick Presence Trigger Banner */}
          <div className="presence-banner-bar glass-panel">
            <div className="presence-bar-left">
              <span className="live-pulse-badge">
                <span className="ping-dot"></span>
                <span className="mono">{onlineMembersCount} dari 8 Dev Sedang Online</span>
              </span>
              <span className="presence-bar-desc">Anggota circle bisa login/ganti status aktivitas kodingan secara real-time.</span>
            </div>
            <button
              onClick={() => setIsPresenceModalOpen(true)}
              className="btn-primary presence-bar-btn"
            >
              <Settings2 size={16} />
              <span>Update Status Dev</span>
            </button>
          </div>
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

        {/* Squad Grid: 8 Members with Live Presence */}
        <div className="squad-grid">
          {KOBRAT_DATA.squad.map((member) => {
            const presence = squadPresence[member.id] || {
              isOnline: false,
              status: member.status,
              activity: member.role,
              lastActive: 'Offline',
            };

            return (
              <div 
                key={member.id} 
                className={`squad-card glass-panel ${presence.isOnline ? 'card-online' : ''}`}
              >
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

                  {/* Presence Floating Badge */}
                  <div className={`squad-status-floating ${presence.isOnline ? 'is-online' : 'is-offline'}`}>
                    <span className={`status-dot ${presence.isOnline ? 'online' : 'offline'}`}></span>
                    <span title={presence.status}>{presence.status}</span>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="squad-info">
                  <div className="squad-name-row">
                    <h2 className="squad-name">{member.name}</h2>
                    {presence.isOnline && (
                      <span className="online-beacon" title="Sedang Aktif"></span>
                    )}
                  </div>
                  <span className="squad-role">{member.role}</span>
                </div>

                {/* Live Activity note if available */}
                {presence.activity && presence.activity !== member.role && (
                  <div className="squad-current-activity">
                    <Activity size={13} className="activity-icon" />
                    <span>{presence.activity}</span>
                  </div>
                )}

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
            );
          })}
        </div>
      </div>
    </div>
  );
}
