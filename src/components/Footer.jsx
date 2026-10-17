import React, { useState, useEffect } from 'react';
import { Coffee, MessageSquare, Heart, Sparkles, Send } from 'lucide-react';
import { GithubIcon } from './Icons';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function Footer({ onShowToast }) {
  const { t, lang } = useApp();
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
    onShowToast?.(lang === 'id' 
      ? "☕ Makasih traktiran kopinya bro! Tim dev Kobrat makin melek ngoding 🚀" 
      : "☕ Thanks for the coffee fuel! Kobrat devs are fully energized 🚀"
    );
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
              {t.footer.about}
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
            <h4 className="footer-col-title">{t.footer.navTitle}</h4>
            <ul className="footer-links">
              <li><a href="/">{t.nav.home}</a></li>
              <li><a href="/services">{t.nav.services}</a></li>
              <li><a href="/calculator">{t.nav.calculator}</a></li>
              <li><a href="/squad">{t.nav.squad}</a></li>
              <li><a href="/portfolio">{t.nav.portfolio}</a></li>
              <li><a href="/faq">{t.nav.faq}</a></li>
            </ul>
          </div>

          {/* Services List */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t.footer.svcTitle}</h4>
            <ul className="footer-links">
              <li><a href="/calculator?service=web-dev">Web App & Landing Page</a></li>
              <li><a href="/calculator?service=tugas-skripsi">Tugas Kuliah & Skripsi</a></li>
              <li><a href="/calculator?service=bot-automation">Bot Telegram & Discord</a></li>
              <li><a href="/calculator?service=bug-fixing">Emergency Bug Fixing</a></li>
              <li><a href="/calculator?service=uiux-design">UI/UX Design Figma</a></li>
            </ul>
          </div>

          {/* Coffee Easter Egg */}
          <div className="footer-col coffee-col">
            <h4 className="footer-col-title">{t.footer.hubTitle}</h4>
            <p className="coffee-desc">
              {t.footer.hubDesc}
            </p>
            <button onClick={handleGiveCoffee} className="coffee-btn glass-panel">
              <Coffee size={18} className="coffee-icon pulse" />
              <span>{t.footer.treatCoffee} ({coffeeCount})</span>
            </button>
            <span className="coffee-hint">{t.footer.coffeeHint}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} KOBRAT Dev Syndicate. {t.footer.copyright}
          </p>
          <div className="footer-badges">
            <span className="mono status-tag">{t.footer.hosted}</span>
            <span className="mono status-tag">{t.footer.zeroDrama}</span>
            <a href="/admin" className="mono status-tag admin-portal-link" title="Squad Member Login">
              🔒 Member Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
