import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ KOBRAT OS v2.4.0 [Interactive Dev Shell]' },
    { type: 'system', text: 'Ketik "help" atau klik tombol pintasan di bawah untuk eksplorasi.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  const devQuotes = [
    "Kodingan jalan jangan disentuh, nafas aja jangan kenceng-kenceng.",
    "Errornya di baris 42, padahal file kodingannya cuma 30 baris.",
    "Ada 2 hal paling susah di dunia koding: Naming variable dan ngejelasin kenapa kodingan ga jalan di laptop dosen.",
    "Bukan bug bro, itu fitur yang belum terdokumentasi.",
    "Tidur jam 4 subuh bukan karena insomnia, tapi karena semi-colon lupa ditaruh.",
  ];

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `COMMANDS TERSEDIA:\n` +
            `  help       - Menampilkan panduan ini\n` +
            `  services   - Daftar layanan kodingan & range harga\n` +
            `  team       - Profil squad dev Kobrat\n` +
            `  pricing    - Info ringkas skema tarif & garansi\n` +
            `  matrix     - Mode visual hacker matrix\n` +
            `  quote      - Kutipan developer pelepas stres\n` +
            `  whoami     - Status user saat ini\n` +
            `  order      - Link instan konsultasi WhatsApp\n` +
            `  clear      - Bersihkan layar shell`
        });
        break;

      case 'services':
      case 'jasa':
        newHistory.push({
          type: 'output',
          text: `LAYANAN KOBRAT SYNDICATE:\n` +
            KOBRAT_DATA.services.map(s => `  • ${s.title.padEnd(30, ' ')} -> Mulai ${s.startingPrice} (${s.turnaround})`).join('\n') +
            `\n\n💡 Ketik "order" atau scroll ke bagian Kalkulator untuk estimasi detail!`
        });
        break;

      case 'team':
      case 'squad':
        newHistory.push({
          type: 'output',
          text: `KOBRAT CREW:\n` +
            KOBRAT_DATA.squad.map(m => `  • ${m.name} [${m.role}]\n    Skills: ${m.skills.join(', ')}\n    Status: ${m.status}`).join('\n\n')
        });
        break;

      case 'pricing':
        newHistory.push({
          type: 'output',
          text: `ESTIMASI HARGA SINGKAT:\n` +
            `  - Tugas Harian / Praktikum : Rp 150k - Rp 350k\n` +
            `  - Landing Page Modern     : Rp 350k - Rp 700k\n` +
            `  - Web App Fullstack       : Rp 650k - Rp 1.8jt\n` +
            `  - Bot Discord / Telegram  : Rp 200k - Rp 500k\n` +
            `  - Skripsi / Tugas Akhir   : Rp 850k - Rp 2.5jt (Include Bimbingan GMeet)\n` +
            `  - Emergency Bug Fixing    : Mulai Rp 75k\n` +
            `*Harga menyesuaikan kompleksitas & deadline.`
        });
        break;

      case 'quote':
        const rand = devQuotes[Math.floor(Math.random() * devQuotes.length)];
        newHistory.push({ type: 'output', text: `💬 "${rand}"` });
        break;

      case 'whoami':
        newHistory.push({ type: 'output', text: `👤 You are a visitor in search of high-caliber dev wizards.` });
        break;

      case 'order':
        window.open(`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Saya%20tertarik%20order%20lewat%20terminal%20web`, '_blank');
        newHistory.push({ type: 'output', text: `🚀 Membuka WhatsApp Kobrat... Silakan sampaikan kebutuhanmu!` });
        break;

      case 'matrix':
        setIsMatrixMode(prev => !prev);
        newHistory.push({ type: 'output', text: `⚡ Toggling Matrix Rain Animation Mode!` });
        break;

      case 'admin':
        window.location.href = '/admin';
        newHistory.push({ type: 'output', text: `🔐 Redirecting to KOBRAT Member Portal (/admin)...` });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo rm -rf /':
      case 'rm -rf /':
        newHistory.push({ type: 'output', text: `🛡️ Nice try! Kobrat core is secured with biometric firewall.` });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${rawCmd}. Ketik "help" untuk melihat daftar perintah.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-modal-overlay">
      <div className={`terminal-window ${isMatrixMode ? 'matrix-active' : ''}`}>
        {/* Terminal Header Bar */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose} title="Tutup"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title mono">
            <TerminalIcon size={14} /> kobrat@syndicate:~ (bash)
          </div>
          <button className="terminal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body mono">
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}

          {/* Matrix Easter Egg visual */}
          {isMatrixMode && (
            <div className="matrix-rain">
              01010110 01101111 01100010 01110010 01100001 01110100 00100000 01001111 01001110 00100000 01010100 01001111 01010000
            </div>
          )}

          {/* Active Input Line */}
          <div className="term-input-line">
            <span className="term-prompt">guest@kobrat:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="term-input"
              autoFocus
              placeholder="ketik command..."
            />
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Chips */}
        <div className="terminal-chips">
          <span className="chips-label">Quick:</span>
          {['help', 'services', 'team', 'pricing', 'quote', 'order', 'matrix', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="chip-btn"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
