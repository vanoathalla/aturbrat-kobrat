import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-wrapper faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>TANYA JAWAB SANTAI</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-desc">
            Pertanyaan yang sering banget ditanyain sebelum mulai deal projek. Masih ada yang ambigu? Langsung chat kita aja.
          </p>
        </div>

        {/* FAQ Accordion List */}
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
      </div>
    </section>
  );
}
