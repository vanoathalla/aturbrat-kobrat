import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calculator, Check, MessageSquare, Copy, Sparkles, 
  Clock, ShieldAlert, ArrowRight 
} from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';
import { useApp } from '../context/AppContext';

export default function CalculatorPage({ onShowToast }) {
  const { t, lang } = useApp();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const calcData = KOBRAT_DATA.calculatorData;

  const getInitialProjectType = (serviceId) => {
    switch (serviceId) {
      case 'web-dev': return 'landing';
      case 'tugas-skripsi': return 'skripsi';
      case 'bot-automation': return 'bot';
      case 'uiux-design': return 'uiux';
      case 'bug-fixing': return 'bugfix';
      case 'api-backend': return 'webapp';
      default: return 'landing';
    }
  };

  const [selectedType, setSelectedType] = useState(() => getInitialProjectType(serviceParam));
  const [selectedUrgency, setSelectedUrgency] = useState('normal');
  const [selectedAddons, setSelectedAddons] = useState(['mentoring']);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (serviceParam) {
      setSelectedType(getInitialProjectType(serviceParam));
    }
  }, [serviceParam]);

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const projectObj = calcData.projectTypes.find(p => p.id === selectedType) || calcData.projectTypes[0];
  const urgencyObj = calcData.urgencyOptions.find(u => u.id === selectedUrgency) || calcData.urgencyOptions[1];

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = calcData.addons.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const baseCalculated = projectObj.basePrice * urgencyObj.multiplier;
  const grandTotal = Math.round((baseCalculated + addonsTotal) / 1000) * 1000;
  
  const formatCurrency = (val) => {
    if (lang === 'en') {
      const approxUSD = Math.round(val / 16000);
      return `~ $${approxUSD} (Rp ${new Intl.NumberFormat('id-ID').format(val)})`;
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const estimatedDays = Math.max(1, projectObj.days + urgencyObj.extraDays);

  const generateWhatsAppMessage = () => {
    const addonLabels = selectedAddons.map(id => {
      const a = calcData.addons.find(item => item.id === id);
      return a ? `  + ${a.label}` : '';
    }).join('\n');

    let msg = `Halo Tim KOBRAT Syndicate! 👋\n` +
      `Saya mau konsultasi / order projek kodingan:\n\n` +
      `📌 *Jenis Projek*: ${projectObj.label}\n` +
      `⏱️ *Deadline*: ${urgencyObj.label} (Est. ${estimatedDays} hari)\n` +
      (selectedAddons.length > 0 ? `📦 *Add-ons*:\n${addonLabels}\n` : '') +
      `💰 *Estimasi Biaya*: Rp ${new Intl.NumberFormat('id-ID').format(grandTotal)}\n` +
      (notes.trim() ? `📝 *Catatan Tambahan*: ${notes}\n\n` : '\n') +
      `Apakah slot pengerjaan masih tersedia? Terima kasih!`;

    return msg;
  };

  const handleCopyOrder = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    onShowToast?.(lang === 'id' ? "📋 Rincian pesanan disalin!" : "📋 Order draft copied to clipboard!");
  };

  const handleWhatsAppRedirect = () => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="page-wrapper calculator-page">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>{t.calc.tag}</span>
          </div>
          <h1 className="section-title">
            {t.calc.title}<span className="gradient-text">{t.calc.titleHighlight}</span>
          </h1>
          <p className="section-desc">
            {t.calc.desc}
          </p>
        </div>

        <div className="calculator-wrapper glass-panel">
          {/* Controls Column */}
          <div className="calc-controls">
            {/* Step 1 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">1</span>
                <span>{t.calc.step1}</span>
              </label>
              <div className="calc-grid-options">
                {calcData.projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`calc-option-card ${selectedType === type.id ? 'active' : ''}`}
                  >
                    <div className="option-header">
                      <span className="option-title">{type.label}</span>
                      {selectedType === type.id && <Check size={16} className="check-icon" />}
                    </div>
                    <span className="option-price mono">{formatCurrency(type.basePrice)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">2</span>
                <span>{t.calc.step2}</span>
              </label>
              <div className="calc-grid-urgency">
                {calcData.urgencyOptions.map((urgency) => (
                  <button
                    key={urgency.id}
                    type="button"
                    onClick={() => setSelectedUrgency(urgency.id)}
                    className={`calc-urgency-card ${selectedUrgency === urgency.id ? 'active' : ''}`}
                  >
                    <span className="urgency-tag">{urgency.tag}</span>
                    <span className="urgency-title">{urgency.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">3</span>
                <span>{t.calc.step3}</span>
              </label>
              <div className="calc-addons-list">
                {calcData.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`addon-item ${isChecked ? 'active' : ''}`}
                    >
                      <div className="addon-checkbox">
                        {isChecked && <Check size={14} />}
                      </div>
                      <span className="addon-title">{addon.label}</span>
                      <span className="addon-price mono">+{formatCurrency(addon.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">4</span>
                <span>{t.calc.step4}</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.calc.placeholder}
                rows={3}
                className="calc-textarea"
              />
            </div>
          </div>

          {/* Summary Column */}
          <div className="calc-summary-card">
            <div className="summary-badge">
              <span className="ping-dot"></span>
              <span>LIVE ESTIMATOR</span>
            </div>

            <h2 className="summary-title">{t.calc.summaryTitle}</h2>

            <div className="summary-details">
              <div className="detail-row">
                <span className="detail-label">{t.calc.projectType}</span>
                <span className="detail-value">{projectObj.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">{t.calc.urgency}</span>
                <span className="detail-value">{urgencyObj.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">{t.calc.estTime}</span>
                <span className="detail-value highlight">~ {estimatedDays} {lang === 'id' ? 'Hari' : 'Days'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">{t.calc.addonsSelected}</span>
                <span className="detail-value">{selectedAddons.length}</span>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total-box">
              <span className="total-label">{t.calc.estTotal}</span>
              <div className="total-amount mono gradient-text">
                {formatCurrency(grandTotal)}
              </div>
              <span className="total-sub">
                {t.calc.dpNote}
              </span>
            </div>

            <div className="summary-actions">
              <button
                onClick={handleWhatsAppRedirect}
                className="btn-primary summary-wa-btn"
              >
                <MessageSquare size={18} />
                <span>{t.calc.btnLockWA}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleCopyOrder}
                className="btn-secondary summary-copy-btn"
              >
                <Copy size={16} />
                <span>{t.calc.btnCopy}</span>
              </button>
            </div>

            <div className="summary-guarantee">
              <ShieldAlert size={16} className="guar-icon" />
              <span>{t.calc.guarantee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
