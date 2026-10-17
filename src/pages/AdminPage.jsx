import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, KeyRound, Unlock, LogOut, CheckCircle, ShieldAlert, 
  Activity, Users, Sparkles, ExternalLink, ArrowRight, Eye, EyeOff 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KOBRAT_DATA } from '../data/kobratData';

export default function AdminPage({ onShowToast }) {
  const { 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    slotsCount,
    setSlotsCount,
    isSlotOpen,
    setIsSlotOpen,
    squadPresence,
    updateMemberPresence,
    onlineMembersCount
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);

  // Status Presets
  const statusPresets = [
    { label: "🟢 Online & Ready to Code", text: "🟢 Online (Siap Garap Projek)" },
    { label: "⚡ Rush Hour / Deadline", text: "⚡ Sedang Bantai Deadline (Rush)" },
    { label: "☕ Ngopi / Diskusi", text: "☕ Ngopi sambil nyari ide" },
    { label: "🌙 Offline / Istirahat", text: "🌙 Offline (Recharging)" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(passcode)) {
      setErrorMsg('');
      onShowToast?.("🔓 Login Admin Berhasil! Selamat datang di KOBRAT Command Center.");
    } else {
      setErrorMsg("Passcode salah! Gunakan: kobrat2026");
    }
  };

  const handleToggleMember = (memberId, currentOnline) => {
    updateMemberPresence(memberId, {
      isOnline: !currentOnline,
      status: !currentOnline ? "🟢 Online (Siap Garap)" : "🌙 Offline (Recharging)",
    });
    onShowToast?.(`Status ${memberId.toUpperCase()} diperbarui.`);
  };

  const handleUpdateStatus = (memberId, statusText, activityText) => {
    updateMemberPresence(memberId, {
      status: statusText,
      activity: activityText,
    });
    onShowToast?.(`Status kodingan ${memberId.toUpperCase()} berhasil disimpan!`);
  };

  // If Not Authenticated -> Show Passcode Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="page-wrapper admin-gate-page">
        <div className="container">
          <div className="admin-gate-card glass-panel">
            <div className="gate-icon-badge">
              <Lock size={28} className="lock-icon" />
            </div>

            <h1 className="gate-title">KOBRAT Member Portal</h1>
            <p className="gate-desc">
              Portal khusus anggota circle Kobrat untuk mengelola kuota slot pesanan dan status kehadiran dev.
            </p>

            <form onSubmit={handleLogin} className="gate-form">
              <div className="passcode-input-wrapper">
                <KeyRound size={18} className="input-icon" />
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Masukkan Passcode Circle..."
                  className="gate-input mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="show-pass-btn"
                >
                  {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errorMsg && (
                <div className="gate-error-badge">
                  <ShieldAlert size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button type="submit" className="btn-primary gate-submit-btn">
                <Unlock size={16} />
                <span>Buka Dashboard Admin</span>
              </button>

              <div className="gate-hint-box">
                <span className="mono">💡 Passcode default: <strong>kobrat2026</strong></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // If Authenticated -> Show Full Command Center
  return (
    <div className="page-wrapper admin-dashboard-page">
      <div className="container">
        {/* Top Header */}
        <div className="admin-header-row">
          <div>
            <div className="section-tag">
              <Sparkles size={14} />
              <span>SQUAD COMMAND CENTER</span>
            </div>
            <h1 className="admin-page-title">
              KOBRAT <span className="gradient-text">Duty Console</span>
            </h1>
            <p className="admin-page-desc">
              Hanya kamu dan anggota squad yang bisa mengakses halaman ini. Perubahan yang kamu buat di sini langsung tampil secara live di website utama.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link to="/" className="btn-secondary admin-action-btn">
              <ExternalLink size={16} />
              <span>Lihat Web Live</span>
            </Link>
            <button
              onClick={() => {
                logoutAdmin();
                onShowToast?.("🔒 Berhasil Logout dari Dashboard Admin.");
              }}
              className="btn-secondary admin-logout-btn"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Section 1: Slots Management */}
        <div className="admin-card glass-panel slot-manager-card">
          <div className="card-header-bar">
            <div>
              <h2 className="admin-card-title">1. Kelola Kuota Slot Projek</h2>
              <p className="admin-card-sub">Atur apakah Kobrat menerima projek baru minggu ini atau full slot.</p>
            </div>
            <div className="slot-live-pill">
              <span className={`status-dot ${isSlotOpen ? 'online' : 'offline'}`}></span>
              <span className="mono">
                {isSlotOpen ? `OPEN SLOT (${slotsCount} Slot)` : 'FULL SLOT (CLOSED)'}
              </span>
            </div>
          </div>

          <div className="slot-admin-controls">
            <div className="slot-btn-group">
              <button
                type="button"
                onClick={() => {
                  setIsSlotOpen(true);
                  onShowToast?.("🟢 Status diubah menjadi OPEN SLOT!");
                }}
                className={`admin-toggle-pill ${isSlotOpen ? 'active-open' : ''}`}
              >
                <span className="ping-dot"></span>
                <span>Buka Slot (OPEN)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSlotOpen(false);
                  onShowToast?.("🔴 Status diubah menjadi FULL SLOT!");
                }}
                className={`admin-toggle-pill ${!isSlotOpen ? 'active-closed' : ''}`}
              >
                <span>Tutup Slot (FULL / WAITING LIST)</span>
              </button>
            </div>

            {isSlotOpen && (
              <div className="stepper-box">
                <span className="stepper-title">Jumlah Slot Tersedia:</span>
                <div className="stepper-controls">
                  <button
                    type="button"
                    onClick={() => setSlotsCount(Math.max(1, slotsCount - 1))}
                    className="step-btn"
                  >
                    -
                  </button>
                  <span className="step-count mono">{slotsCount}</span>
                  <button
                    type="button"
                    onClick={() => setSlotsCount(Math.min(10, slotsCount + 1))}
                    className="step-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: 8 Members Live Presence Manager */}
        <div className="admin-card glass-panel">
          <div className="card-header-bar">
            <div>
              <h2 className="admin-card-title">2. Presensi & Status 8 Anggota Squad</h2>
              <p className="admin-card-sub">
                Tentukan siapa yang sedang aktif di depan laptop, sedang ngopi, atau offline.
              </p>
            </div>
            <span className="mono online-summary-badge">
              🟢 {onlineMembersCount} dari 8 Dev Online
            </span>
          </div>

          <div className="admin-squad-roster-grid">
            {KOBRAT_DATA.squad.map((member) => {
              const presence = squadPresence[member.id] || {
                isOnline: false,
                status: member.status,
                activity: member.role,
              };

              return (
                <div 
                  key={member.id} 
                  className={`roster-admin-card glass-panel ${presence.isOnline ? 'is-active-member' : ''}`}
                >
                  {/* Member Top Row */}
                  <div className="roster-top">
                    <img src={member.photo} alt={member.name} className="roster-photo" />
                    <div className="roster-info">
                      <div className="roster-names">
                        <span className="roster-nick">{member.nickname}</span>
                        <span className="roster-full">{member.name}</span>
                      </div>
                      <span className="roster-role">{member.role}</span>
                    </div>

                    {/* Online Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleMember(member.id, presence.isOnline)}
                      className={`toggle-switch-btn ${presence.isOnline ? 'on' : 'off'}`}
                      title={presence.isOnline ? "Klik untuk jadikan Offline" : "Klik untuk jadikan Online"}
                    >
                      <span className="switch-knob"></span>
                      <span className="switch-label">{presence.isOnline ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  {/* Status Preset Selector */}
                  <div className="roster-controls">
                    <label className="roster-label">Status Live:</label>
                    <select
                      value={presence.status}
                      onChange={(e) => handleUpdateStatus(member.id, e.target.value, presence.activity)}
                      className="roster-select"
                    >
                      {statusPresets.map((sp, idx) => (
                        <option key={idx} value={sp.text}>
                          {sp.label}
                        </option>
                      ))}
                    </select>

                    <label className="roster-label">Aktivitas Saat Ini:</label>
                    <input
                      type="text"
                      defaultValue={presence.activity || member.role}
                      onBlur={(e) => handleUpdateStatus(member.id, presence.status, e.target.value)}
                      placeholder="Contoh: Bantai UI Figma / Coding API"
                      className="roster-input"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
