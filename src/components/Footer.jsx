import React, { useState, useEffect } from 'react';
import { Coffee, MessageSquare, Heart, Sparkles, Send } from 'lucide-react';
import { GithubIcon } from './Icons';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Footer({ onShowToast }) {
  const [coffeeCount, setCoffeeCount] = useState(42);

  useEffect(() => {
    const saved = localStorage.getItem('kobrat_coffee');
    if (saved) {
      setCoffeeCount(parseInt(saved, 10));
    }
  }, []);

  const handleGiveCoffee = () => {
    const next = coffeeCount + 1;
    setCoffeeCount(next);
    localStorage.setItem('kobrat_coffee', next.toString());
    onShowToast?.("☕ Makasih traktiran kopinya bro! Tim dev Kobrat makin melek ngoding 🚀");
  };

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand-logo">
              <div className="logo-badge">
                <span className="logo-icon">🐍</span>
              </div>
              <div className="brand-info">
                <span className="brand-name">KOBRAT</span>
                <span className="brand-sub">// dev_syndicate</span>
              </div>
            </div>
            <p className="footer-about">
              Bukan cuma circle tongkrongan biasa. Kami kolektif developer, desainer, dan pemecah masalah kodingan yang siap bikin ide atau tugasmu kelar tanpa drama.
            </p>
            <div className="footer-socials">
              <a 
                href={KOBRAT_DATA.brand.githubOrg} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a 
                href={KOBRAT_DATA.brand.discordLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                title="Discord Community"
              >
                <span>👾</span>
              </a>
              <a 
                href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                title="WhatsApp Direct"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigasi</h4>
            <ul className="footer-links">
              <li><a href="#layanan">Layanan & Jasa</a></li>
              <li><a href="#kalkulator">Kalkulator Biaya</a></li>
              <li><a href="#squad">Squad Kobrat</a></li>
              <li><a href="#portfolio">Track Record</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Services List */}
          <div className="footer-col">
            <h4 className="footer-col-title">Layanan Utama</h4>
            <ul className="footer-links">
              <li><a href="#kalkulator">Web App & Landing Page</a></li>
              <li><a href="#kalkulator">Tugas Kuliah & Skripsi</a></li>
              <li><a href="#kalkulator">Bot Telegram & Discord</a></li>
              <li><a href="#kalkulator">Emergency Bug Fixing</a></li>
              <li><a href="#kalkulator">UI/UX Design Figma</a></li>
            </ul>
          </div>

          {/* Coffee Easter Egg */}
          <div className="footer-col coffee-col">
            <h4 className="footer-col-title">Tongkrongan Hub</h4>
            <p className="coffee-desc">
              Kopi adalah bensin utama kami saat nuntasin deadline jam 3 pagi.
            </p>
            <button onClick={handleGiveCoffee} className="coffee-btn glass-panel">
              <Coffee size={18} className="coffee-icon pulse" />
              <span>Traktir Kopi ({coffeeCount})</span>
            </button>
            <span className="coffee-hint">*Klik untuk kirim energi kopi ke dev</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} KOBRAT Dev Syndicate. Built with passion & lots of coffee.
          </p>
          <div className="footer-badges">
            <span className="mono status-tag">⚡ Hosted on Vercel</span>
            <span className="mono status-tag">🛡️ Zero Drama Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
