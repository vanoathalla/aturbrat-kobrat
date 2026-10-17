import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calculator, Check, MessageSquare, Copy, Sparkles, 
  Clock, ShieldAlert, ArrowRight, RotateCcw 
} from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function CalculatorPage({ onShowToast }) {
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
  
  const formatRupiah = (val) => {
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
      `💰 *Estimasi Biaya*: ${formatRupiah(grandTotal)}\n` +
      (notes.trim() ? `📝 *Catatan Tambahan*: ${notes}\n\n` : '\n') +
      `Apakah slot pengerjaan masih tersedia? Terima kasih!`;

    return msg;
  };

  const handleCopyOrder = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    onShowToast?.("📋 Rincian pesanan disalin! Silakan kirim langsung ke WhatsApp.");
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
            <span>TRANSPARANSI BIAYA</span>
          </div>
          <h1 className="section-title">
            Kalkulator Estimasi Biaya <span className="gradient-text">Anti Boncos</span>
          </h1>
          <p className="section-desc">
            Sesuaikan dengan kebutuhan dan deadline-mu. Dapatkan estimasi biaya yang jelas, transparan, dan langsung terhubung ke WhatsApp tim Kobrat.
          </p>
        </div>

        <div className="calculator-wrapper glass-panel">
          {/* Controls Column */}
          <div className="calc-controls">
            {/* Step 1 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">1</span>
                <span>Pilih Jenis Projek:</span>
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
                    <span className="option-price mono">Mulai {formatRupiah(type.basePrice)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">2</span>
                <span>Pilih Tenggat Waktu (Deadline):</span>
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
                <span>Layanan Tambahan (Opsional):</span>
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
                      <span className="addon-price mono">+{formatRupiah(addon.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4 */}
            <div className="calc-group">
              <label className="calc-group-label">
                <span className="step-num">4</span>
                <span>Ceritakan Brief / Deadline Spesifikmu (Opsional):</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: 'Tugas kuliah machine learning python, deadline lusa jam 10 pagi...'"
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

            <h2 className="summary-title">Ringkasan Pesanan</h2>

            <div className="summary-details">
              <div className="detail-row">
                <span className="detail-label">Jenis Projek:</span>
                <span className="detail-value">{projectObj.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tingkat Urgensi:</span>
                <span className="detail-value">{urgencyObj.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Estimasi Waktu:</span>
                <span className="detail-value highlight">~ {estimatedDays} Hari</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Add-ons:</span>
                <span className="detail-value">{selectedAddons.length} terpilih</span>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total-box">
              <span className="total-label">Estimasi Total Biaya:</span>
              <div className="total-amount mono gradient-text">
                {formatRupiah(grandTotal)}
              </div>
              <span className="total-sub">
                *Bisa DP 30% santai. Pelunasan setelah melihat hasil demo.
              </span>
            </div>

            <div className="summary-actions">
              <button
                onClick={handleWhatsAppRedirect}
                className="btn-primary summary-wa-btn"
              >
                <MessageSquare size={18} />
                <span>Kunci Slot via WhatsApp</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleCopyOrder}
                className="btn-secondary summary-copy-btn"
              >
                <Copy size={16} />
                <span>Salin Format Pesanan</span>
              </button>
            </div>

            <div className="summary-guarantee">
              <ShieldAlert size={16} className="guar-icon" />
              <span>Garansi 100% uang kembali jika hasil melenceng dari kesepakatan brief awal.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
