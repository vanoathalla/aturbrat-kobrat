import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, Bot, Loader2 } from 'lucide-react';
import { KOBRAT_DATA } from '../data/kobratData';
import { askKobratAi, resetAiConversation } from '../utils/aiService';

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ KOBRAT OS v2.5.0 [Neural AI Dev Shell]' },
    { type: 'ai-badge', text: '🤖 KOBRAT AI ENGINE: ONLINE (Tanyakan APAPUN: Kodingan, Debugging, Teori, Sains, Umum, dll)' },
    { type: 'system', text: '💡 Tips: Langsung ketik pertanyaanmu atau gunakan command shell: help, services, team, clear' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode, isAiThinking]);

  const devQuotes = [
    "Kodingan jalan jangan disentuh, nafas aja jangan kenceng-kenceng.",
    "Errornya di baris 42, padahal file kodingannya cuma 30 baris.",
    "Ada 2 hal paling susah di dunia koding: Naming variable dan ngejelasin kenapa kodingan ga jalan di laptop dosen.",
    "Bukan bug bro, itu fitur yang belum terdokumentasi.",
    "Tidur jam 4 subuh bukan karena insomnia, tapi karena semi-colon lupa ditaruh.",
  ];

  const handleCommand = async (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd || isAiThinking) return;

    const lowerCmd = cmd.toLowerCase();

    // Append user input to history
    setHistory(prev => [...prev, { type: 'user', text: `$ ${cmd}` }]);
    setInputVal('');

    // Built-in Shell Commands
    switch (lowerCmd) {
      case 'help':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: `COMMANDS TERSEDIA:\n` +
              `  help       - Menampilkan panduan shell\n` +
              `  services   - Daftar layanan kodingan & range harga\n` +
              `  team       - Profil 8 squad dev Kobrat\n` +
              `  pricing    - Info ringkas skema tarif & garansi\n` +
              `  matrix     - Mode visual hacker matrix\n` +
              `  quote      - Kutipan developer pelepas stres\n` +
              `  whoami     - Status user saat ini\n` +
              `  order      - Link instan konsultasi WhatsApp\n` +
              `  clear      - Bersihkan layar & reset memori chat\n\n` +
              `🤖 KOBRAT AI CHAT:\n` +
              `  Tanyakan APAPUN langsung di sini tanpa prefix!\n` +
              `  Contoh:\n` +
              `  • "jelasin apa itu recursion di python"\n` +
              `  • "cara bikin auth JWT di express.js"\n` +
              `  • "rekomendasi laptop buat ngoding 2026"\n` +
              `  • "siapa aja anggota kobrat dan keahliannya?"`
          }
        ]);
        return;

      case 'services':
      case 'jasa':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: `LAYANAN KOBRAT SYNDICATE:\n` +
              KOBRAT_DATA.services.map(s => `  • ${s.title.padEnd(30, ' ')} -> Mulai ${s.startingPrice} (${s.turnaround})`).join('\n') +
              `\n\n💡 Ketik "order" atau cek menu Kalkulator untuk estimasi detail!`
          }
        ]);
        return;

      case 'team':
      case 'squad':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: `KOBRAT CREW (8 DEV SAHABAT):\n` +
              KOBRAT_DATA.squad.map(m => `  • ${m.name} (${m.nickname}) [${m.role}]\n    Skills: ${m.skills.join(', ')}\n    Status: ${m.status}`).join('\n\n')
          }
        ]);
        return;

      case 'pricing':
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: `ESTIMASI HARGA SINGKAT:\n` +
              `  - Tugas Harian / Praktikum : Rp 150k - Rp 350k\n` +
              `  - Landing Page Modern     : Rp 350k - Rp 700k\n` +
              `  - Web App Fullstack       : Rp 650k - Rp 1.8jt\n` +
              `  - Bot Discord / Telegram  : Rp 200k - Rp 500k\n` +
              `  - Skripsi / Tugas Akhir   : Rp 850k - Rp 2.5jt (Include Bimbingan GMeet)\n` +
              `  - Emergency Bug Fixing    : Mulai Rp 75k\n` +
              `*Harga menyesuaikan kompleksitas & deadline.`
          }
        ]);
        return;

      case 'quote':
        const rand = devQuotes[Math.floor(Math.random() * devQuotes.length)];
        setHistory(prev => [...prev, { type: 'output', text: `💬 "${rand}"` }]);
        return;

      case 'whoami':
        setHistory(prev => [...prev, { type: 'output', text: `👤 You are a visitor seeking elite dev wizards & brotherhood lore.` }]);
        return;

      case 'order':
        window.open(`https://wa.me/${KOBRAT_DATA.brand.whatsappNumber}?text=Halo%20Kobrat!%20Saya%20tertarik%20order%20lewat%20terminal%20web`, '_blank');
        setHistory(prev => [...prev, { type: 'output', text: `🚀 Membuka WhatsApp Kobrat... Silakan sampaikan kebutuhanmu!` }]);
        return;

      case 'matrix':
        setIsMatrixMode(prev => !prev);
        setHistory(prev => [...prev, { type: 'output', text: `⚡ Toggling Matrix Rain Animation Mode!` }]);
        return;

      case 'admin':
        window.location.href = '/admin';
        setHistory(prev => [...prev, { type: 'output', text: `🔐 Redirecting to KOBRAT Member Portal (/admin)...` }]);
        return;

      case 'clear':
        resetAiConversation();
        setHistory([
          { type: 'system', text: '⚡ Terminal cleared. AI conversation context has been reset.' }
        ]);
        return;

      case 'sudo rm -rf /':
      case 'rm -rf /':
        setHistory(prev => [...prev, { type: 'output', text: `🛡️ Nice try! Kobrat core is secured with biometric firewall.` }]);
        return;

      default:
        // ROUTE ALL OTHER QUERIES TO KOBRAT NEURAL AI!
        setIsAiThinking(true);
        try {
          const aiResponse = await askKobratAi(cmd);
          setHistory(prev => [
            ...prev,
            {
              type: 'ai',
              text: `🤖 KOBRAT AI:\n${aiResponse}`
            }
          ]);
        } catch (error) {
          setHistory(prev => [
            ...prev,
            {
              type: 'error',
              text: `⚠️ Maaf, ada kendala saat menghubungi AI. Coba tanyakan lagi atau ketik 'help'.`
            }
          ]);
        } finally {
          setIsAiThinking(false);
          setTimeout(() => inputRef.current?.focus(), 50);
        }
        break;
    }
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
            <TerminalIcon size={14} /> kobrat@syndicate:~ (ai-shell)
            <span className="terminal-ai-status">
              <span className="ai-dot-pulse"></span>
              <span>AI ACTIVE</span>
            </span>
          </div>

          <button className="terminal-close-btn" onClick={onClose} title="Tutup Terminal">
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

          {/* AI Thinking Animation */}
          {isAiThinking && (
            <div className="term-line term-ai-thinking">
              <span className="thinking-spinner">⚡</span>
              <span>KOBRAT AI sedang menganalisis & meracik jawaban...</span>
            </div>
          )}

          {/* Matrix Easter Egg visual */}
          {isMatrixMode && (
            <div className="matrix-rain">
              01010110 01101111 01100010 01110010 01100001 01110100 00100000 01001111 01001110 00100000 01010100 01001111 01010000
            </div>
          )}

          {/* Active Input Line */}
          <div className="term-input-line">
            <span className="term-prompt">user@kobrat:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAiThinking}
              className="term-input"
              autoFocus
              placeholder={isAiThinking ? "Menunggu jawaban AI..." : "Ketik pertanyaan apa saja (atau command: help, services, team)..."}
            />
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command & AI Prompt Chips */}
        <div className="terminal-chips">
          <span className="chips-label">Quick:</span>
          {[
            { label: 'help', cmd: 'help' },
            { label: 'services', cmd: 'services' },
            { label: 'team', cmd: 'team' },
            { label: '💬 Jelasin Git', cmd: 'Jelasin git rebase vs merge singkat dong' },
            { label: '💬 Tips Ngoding', cmd: 'Tips buat pemula yang baru belajar ngoding' },
            { label: 'order', cmd: 'order' },
            { label: 'clear', cmd: 'clear' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleCommand(item.cmd)}
              disabled={isAiThinking}
              className="chip-btn"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
