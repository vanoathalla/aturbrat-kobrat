import React from 'react';
import { Star, MessageSquareQuote, Check } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Testimonials() {
  return (
    <section className="section-wrapper testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <MessageSquareQuote size={14} />
            <span>REAL WORDS</span>
          </div>
          <h2 className="section-title">
            Kata Mereka yang Pernah <span className="gradient-text">Terselamatkan</span>
          </h2>
          <p className="section-desc">
            Bukan review bot buatan. Ini cerita nyata dari mahasiswa dan pemilik projek yang deadline-nya berhasil diamankan bareng tim Kobrat.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {KOBRAT_DATA.testimonials.map((item) => (
            <div key={item.id} className="testi-card glass-panel">
              {/* Rating Stars */}
              <div className="testi-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="testi-text">"{item.text}"</p>

              {/* User Info */}
              <div className="testi-user-box">
                <div className="testi-avatar">{item.avatar}</div>
                <div className="testi-user-info">
                  <span className="testi-name">{item.name}</span>
                  <span className="testi-label">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
