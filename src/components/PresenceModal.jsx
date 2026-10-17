import React, { useState } from 'react';
import { X, Check, Activity, ShieldCheck, Flame, Coffee, Moon, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KOBRAT_DATA } from '../data/kobratData';

export default function PresenceModal({ isOpen, onClose, onShowToast }) {
  const { 
    lang, 
    slotsCount, 
    setSlotsCount, 
    isSlotOpen, 
    setIsSlotOpen, 
    squadPresence, 
    updateMemberPresence 
  } = useApp();

  const [selectedMemberId, setSelectedMemberId] = useState('vano');
  const [selectedStatusType, setSelectedStatusType] = useState('online');
  const [customActivity, setCustomActivity] = useState('');

  if (!isOpen) return null;

  const currentMember = KOBRAT_DATA.squad.find(m => m.id === selectedMemberId) || KOBRAT_DATA.squad[0];
  const currentPresence = squadPresence[selectedMemberId] || { isOnline: false, status: '', activity: '' };

  const statusPresets = [
    { id: 'online', label: '🟢 Online & Ready to Code', icon: Activity, text: '🟢 Online (Siap Garap Projek)' },
    { id: 'rush', label: '⚡ Rush Hour / Debugging', icon: Flame, text: '⚡ Sedang Bantai Deadline (Rush)' },
    { id: 'coffee', label: '☕ Ngopi Santai', icon: Coffee, text: '☕ Ngopi sambil nyari ide' },
    { id: 'offline', label: '🌙 Istirahat / AFK', icon: Moon, text: '🌙 Offline (Recharging)' },
  ];

  const handleSaveMemberStatus = () => {
    const isOnline = selectedStatusType !== 'offline';
    const preset = statusPresets.find(p => p.id === selectedStatusType) || statusPresets[0];
    const finalActivity = customActivity.trim() || currentMember.role;

    updateMemberPresence(selectedMemberId, {
      isOnline,
      status: preset.text,
      activity: finalActivity,
    });

    onShowToast?.(
      lang === 'id'
        ? `✨ Status ${currentMember.nickname.toUpperCase()} diperbarui: ${preset.text}`
        : `✨ ${currentMember.nickname.toUpperCase()} status updated: ${preset.text}`
    );
  };

  return (
    <div className="presence-modal-overlay">
      <div className="presence-modal glass-panel">
        {/* Header */}
        <div className="presence-modal-header">
          <div className="presence-header-title">
            <span className="presence-icon-badge">⚡</span>
            <div>
              <h3 className="presence-title">Circle Presence & Slot Manager</h3>
              <p className="presence-subtitle">Kelola kuota slot & aktifkan status live anggota Kobrat</p>
            </div>
          </div>
          <button onClick={onClose} className="presence-close-btn">
            <X size={18} />
          </button>
        </div>

        <div className="presence-modal-body">
          {/* Section 1: Project Slots Control */}
          <div className="presence-section-box">
            <h4 className="section-box-title">
              <span>1. Pengaturan Kuota Slot Projek</span>
            </h4>
            <div className="slot-control-row">
              <div className="slot-toggle-group">
                <button
                  type="button"
                  onClick={() => setIsSlotOpen(true)}
                  className={`slot-toggle-pill ${isSlotOpen ? 'active' : ''}`}
                >
                  <span className="ping-dot"></span>
                  <span>OPEN SLOT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSlotOpen(false)}
                  className={`slot-toggle-pill ${!isSlotOpen ? 'active-full' : ''}`}
                >
                  <span>FULL SLOT / CLOSED</span>
                </button>
              </div>

              {isSlotOpen && (
                <div className="slot-stepper">
                  <span className="stepper-label">Jumlah Slot:</span>
                  <div className="stepper-btns">
                    <button
                      type="button"
                      onClick={() => setSlotsCount(Math.max(1, slotsCount - 1))}
                      className="stepper-btn"
                    >
                      -
                    </button>
                    <span className="stepper-value mono">{slotsCount}</span>
                    <button
                      type="button"
                      onClick={() => setSlotsCount(Math.min(10, slotsCount + 1))}
                      className="stepper-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="slot-live-preview">
              <span className="preview-label">Tampilan Live di Web:</span>
              <span className="preview-pill">
                {isSlotOpen ? `🟢 OPEN SLOT (${slotsCount} Slot Tersedia Minggu Ini)` : `🔴 FULL SLOT (Waiting List)`}
              </span>
            </div>
          </div>

          {/* Section 2: Member Presence / Login Simulator */}
          <div className="presence-section-box">
            <h4 className="section-box-title">
              <span>2. Update Kehadiran & Status Anggota</span>
            </h4>
            <p className="section-box-desc">
              Pilih namamu (misal Mas Vano atau Mas Aca), pilih status kodinganmu saat ini, dan tampilkan status aktifmu di website!
            </p>

            {/* Select Member Chip Grid */}
            <div className="member-picker-grid">
              {KOBRAT_DATA.squad.map((member) => {
                const presence = squadPresence[member.id] || {};
                const isSelected = selectedMemberId === member.id;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => {
                      setSelectedMemberId(member.id);
                      setCustomActivity(presence.activity || '');
                    }}
                    className={`member-picker-card ${isSelected ? 'active' : ''}`}
                  >
                    <img src={member.photo} alt={member.name} className="picker-photo" />
                    <div className="picker-text">
                      <span className="picker-nick">{member.nickname}</span>
                      <span className={`picker-status-dot ${presence.isOnline ? 'online' : 'offline'}`}></span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Status Type Presets */}
            <div className="status-presets-row">
              {statusPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedStatusType(preset.id)}
                  className={`preset-btn ${selectedStatusType === preset.id ? 'active' : ''}`}
                >
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>

            {/* Custom Activity Text */}
            <div className="activity-input-box">
              <label className="activity-label">Sedang mengerjakan apa sekarang? (Opsional):</label>
              <input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Contoh: Sedang ngulik UI Figma / Standby terima tugas..."
                className="activity-input"
              />
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={handleSaveMemberStatus}
              className="btn-primary apply-status-btn"
            >
              <UserCheck size={16} />
              <span>Update Status {currentMember.nickname.toUpperCase()} Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
