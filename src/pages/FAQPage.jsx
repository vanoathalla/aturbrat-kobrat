import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, HeartHandshake } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function FAQPage() {
  const { t } = useApp();
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <div className="page-wrapper faq-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>{t.faq.tag}</span>
          </div>
          <h1 className="section-title">
            {t.faq.title}<span className="gradient-text">{t.faq.titleHighlight}</span>
          </h1>
          <p className="section-desc">
            {t.faq.desc}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-list">
          {KOBRAT_DATA.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="faq-question-btn"
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Banner */}
        <div className="faq-contact-box glass-panel">
          <div className="faq-contact-info">
            <HeartHandshake size={32} className="contact-icon" />
            <div>
              <h3 className="contact-title">{t.faq.helpTitle}</h3>
              <p className="contact-desc">{t.faq.helpDesc}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Mau%20nanya-nanya%20seputar%20jasa%20dong`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary contact-wa-btn"
          >
            <MessageSquare size={16} />
            <span>{t.faq.btnAsk}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
