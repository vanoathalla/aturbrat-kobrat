import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, KeyRound, Unlock, LogOut, CheckCircle, ShieldAlert, 
  Activity, Users, Sparkles, ExternalLink, ArrowRight, Eye, EyeOff,
  LayoutDashboard, Layers, UserCheck, Terminal, Menu, X, Sun, Moon, ArrowLeft, Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KOBRAT_DATA } from '../data/kobratData';

export default function AdminPage({ onShowToast, onOpenTerminal }) {
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
    onlineMembersCount,
    theme,
    toggleTheme
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'slots', 'squad'
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleSetAllOnline = () => {
    KOBRAT_DATA.squad.forEach((m) => {
      updateMemberPresence(m.id, {
        isOnline: true,
        status: "🟢 Online (Siap Garap)",
        activity: m.role,
      });
    });
    onShowToast?.("⚡ Semua 8 anggota Kobrat diset ONLINE!");
  };

  const handleSetAllOffline = () => {
    KOBRAT_DATA.squad.forEach((m) => {
      updateMemberPresence(m.id, {
        isOnline: false,
        status: "🌙 Offline (Recharging)",
      });
    });
    onShowToast?.("🌙 Semua anggota Kobrat diset OFFLINE.");
  };

  // If Not Authenticated -> Show Passcode Gate with Back to Home button
  if (!isAdminAuthenticated) {
    return (
      <div className="page-wrapper admin-gate-page">
        <div className="container">
          {/* Top Bar on Gate */}
          <div className="gate-top-nav">
            <Link to="/" className="btn-secondary gate-back-btn">
              <ArrowLeft size={16} />
              <span>Kembali ke Web Tamu</span>
            </Link>
          </div>

          <div className="admin-gate-card glass-panel">
            <div className="gate-icon-badge">
              <Lock size={28} className="lock-icon" />
            </div>

            <h1 className="gate-title">KOBRAT Duty Console</h1>
            <p className="gate-desc">
              Portal khusus anggota circle Kobrat untuk mengelola kuota slot pesanan dan presensi dev.
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

  // If Authenticated -> Show Dedicated Admin Dashboard with Left Sidebar & Admin Topbar
  return (
    <div className="admin-layout-root">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* DEDICATED LEFT SIDEBAR */}
      <aside className={`admin-left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <div className="ios-logo-squircle">
              <span>🐍</span>
            </div>
            <div>
              <span className="admin-brand-name">KOBRAT</span>
              <span className="admin-brand-tag">DUTY CONSOLE</span>
            </div>
          </div>
          <button 
            className="admin-sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Admin Session Badge */}
        <div className="admin-session-pill">
          <Shield size={13} className="shield-icon" />
          <span className="mono">SQUAD HQ ACCESS</span>
          <span className="status-dot online"></span>
        </div>

        {/* Sidebar Navigation Tabs */}
        <nav className="admin-sidebar-nav">
          <button
            onClick={() => { setActiveTab('all'); setSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === 'all' ? 'active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Semua Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('slots'); setSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === 'slots' ? 'active' : ''}`}
          >
            <Layers size={17} />
            <span>Kelola Slot Projek</span>
            <span className="nav-badge mono">{isSlotOpen ? `${slotsCount} Open` : 'Full'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('squad'); setSidebarOpen(false); }}
            className={`admin-nav-item ${activeTab === 'squad' ? 'active' : ''}`}
          >
            <UserCheck size={17} />
            <span>Presensi 8 Squad Dev</span>
            <span className="nav-badge mono">{onlineMembersCount}/8</span>
          </button>

          {onOpenTerminal && (
            <button
              onClick={() => { onOpenTerminal(); setSidebarOpen(false); }}
              className="admin-nav-item"
            >
              <Terminal size={17} />
              <span>Buka AI Terminal CLI</span>
            </button>
          )}
        </nav>

        {/* Quick Batch Controls */}
        <div className="admin-sidebar-batch">
          <span className="batch-label mono">⚡ AKSI CEPAT PRESENSI:</span>
          <div className="batch-btn-row">
            <button 
              onClick={handleSetAllOnline} 
              className="batch-btn batch-online"
              title="Setel semua anggota online"
            >
              Set All Online
            </button>
            <button 
              onClick={handleSetAllOffline} 
              className="batch-btn batch-offline"
              title="Setel semua anggota offline"
            >
              Set All Offline
            </button>
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="admin-sidebar-footer">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-footer-btn view-web-btn">
            <ExternalLink size={15} />
            <span>Buka Web Tamu ↗</span>
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              onShowToast?.("🔒 Berhasil Logout dari Dashboard Admin.");
            }}
            className="admin-footer-btn logout-btn"
          >
            <LogOut size={15} />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE (Top Bar + Content) */}
      <div className="admin-main-viewport">
        {/* DEDICATED ADMIN TOPBAR (Distinct from Public User Navbar!) */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Buka Menu Admin"
            >
              <Menu size={20} />
            </button>

            <div className="admin-breadcrumbs">
              <span className="crumb-root">KOBRAT HQ</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-active">Duty Console</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Live Presence Status */}
            <div className="topbar-status-pill">
              <span className="status-dot online"></span>
              <span className="mono">{onlineMembersCount} Dev Online</span>
            </div>

            {/* Slot Indicator */}
            <div className={`topbar-slot-pill ${isSlotOpen ? 'open' : 'closed'}`}>
              <span className="mono">
                {isSlotOpen ? `OPEN (${slotsCount})` : 'FULL SLOT'}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                onShowToast?.(theme === 'dark' ? "☀️ Light Mode" : "🌙 Dark Mode");
              }}
              className="topbar-icon-btn"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Direct Link to Public Web */}
            <Link 
              to="/" 
              className="topbar-action-pill view-site-pill" 
              title="Lihat Website Sebagai Tamu"
            >
              <ExternalLink size={14} />
              <span className="label-text">Lihat Web Tamu</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                logoutAdmin();
                onShowToast?.("🔒 Berhasil Logout dari Dashboard Admin.");
              }}
              className="topbar-icon-btn logout-icon-btn"
              title="Logout Admin"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* SCROLLABLE ADMIN CONTENT AREA */}
        <main className="admin-content-scroll">
          <div className="admin-content-inner">
            {/* Section 1: Quick Stats Overview */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <div className="admin-overview-deck">
                <div className="overview-card glass-panel">
                  <span className="overview-label">STATUS SLOT PROJEK</span>
                  <div className="overview-value-row">
                    <span className={`overview-status-text ${isSlotOpen ? 'text-green' : 'text-red'}`}>
                      {isSlotOpen ? 'OPEN SLOT' : 'FULL SLOT'}
                    </span>
                    <span className="overview-sub mono">{slotsCount} Slot Aktif</span>
                  </div>
                  <p className="overview-desc">Tampil langsung di navbar & kalkulator klien.</p>
                </div>

                <div className="overview-card glass-panel">
                  <span className="overview-label">PRESENSI DEV ONLINE</span>
                  <div className="overview-value-row">
                    <span className="overview-status-text text-white">
                      {onlineMembersCount} <span className="overview-denom">/ 8</span>
                    </span>
                    <span className="overview-sub mono">{Math.round((onlineMembersCount / 8) * 100)}% Kapasitas</span>
                  </div>
                  <p className="overview-desc">Jumlah anggota squad yang sedang aktif ngoding.</p>
                </div>

                <div className="overview-card glass-panel">
                  <span className="overview-label">SQUAD DUTY CONSOLE</span>
                  <div className="overview-value-row">
                    <span className="overview-status-text text-red">LIVE SYNC</span>
                  </div>
                  <p className="overview-desc">Tersinkronisasi otomatis via browser state.</p>
                </div>
              </div>
            )}

            {/* Section 2: Slots Management Card */}
            {(activeTab === 'all' || activeTab === 'slots') && (
              <section className="admin-card glass-panel slot-manager-card">
                <div className="card-header-bar">
                  <div>
                    <h2 className="admin-card-title">1. Kelola Kuota Slot Projek</h2>
                    <p className="admin-card-sub">
                      Atur apakah Kobrat menerima projek baru minggu ini atau full slot (waiting list).
                    </p>
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
              </section>
            )}

            {/* Section 3: 8 Squad Members Live Presence Manager */}
            {(activeTab === 'all' || activeTab === 'squad') && (
              <section className="admin-card glass-panel">
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
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
