// KOBRAT Neural AI Service
// Free, zero-API-key required client-side AI engine powered by Pollinations LLM with offline fallback

import { KOBRAT_DATA } from '../data/kobratData';

const SYSTEM_PROMPT = `Kamu adalah KOBRAT AI — asisten cerdas dan interaktif dari KOBRAT (Web Circle Tongkrongan Kuliah & Sindikat Developer).
Anggota Kobrat beranggotakan 8 sahabat:
1. Mohammad Atilla Danadyaksa (Mas Aca) - Lead Architect
2. Akmal Danendra Maulana (Mas Plenger) - Frontend Wizard
3. Danang Adiwibowo (Mas Nang) - Backend & DevOps
4. Dida Attallah Elfasdi (Mas Did) - Security & Automation
5. Gorga Doli Napitupulu (Mas Jambi) - Fullstack Dev
6. Hafiz Rasendriya (Mas Apis) - UI/UX & Web Dev
7. R. Revano Athalla K (Mas Vano) - Mobile & System Engineer
8. Narindera Jati Panuntun (Mas JP) - Data & Machine Learning

Karakter & Gaya Bicara:
- Luwes, santai, berkarakter Gen-Z tech savvy, sopan, dan solutif.
- Menguasai kodingan tingkat dewa (Python, JavaScript/TypeScript, React, Next.js, Node.js, Laravel, C++, Java, Rust, SQL, Docker, Machine Learning, dll).
- BISA dan BOLEH menjawab pertanyaan APAPUN: penjelasan kodingan, debugging error, contoh source code, teori sains/matematika, rekomendasi tools/spek laptop, tips skripsi/kuliah, obrolan santai, hingga informasi tentang layanan & squad Kobrat.
- Jawaban rapi dengan format teks jelas, poin-poin jika perlu, dan potongan kode yang mudah dibaca.
- Jika ditanya dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia yang santai dan natural. Jika ditanya dalam Bahasa Inggris, jawab dalam Bahasa Inggris.`;

// In-memory conversation history for multi-turn chat
let conversationHistory = [];

export const resetAiConversation = () => {
  conversationHistory = [];
};

export async function askKobratAi(userPrompt) {
  const trimmed = userPrompt.trim();
  if (!trimmed) return "Silakan ketik pertanyaan yang ingin kamu tanyakan!";

  // Append user message to history (limit to last 6 messages to stay fast)
  conversationHistory.push({ role: 'user', content: trimmed });
  if (conversationHistory.length > 8) {
    conversationHistory = conversationHistory.slice(-8);
  }

  const payload = {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory
    ],
    model: 'openai',
    seed: 42,
    jsonMode: false
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const reply = await response.text();

    if (!reply || reply.trim().length === 0) {
      throw new Error('Empty response');
    }

    // Save assistant reply in conversation memory
    conversationHistory.push({ role: 'assistant', content: reply.trim() });

    return reply.trim();
  } catch (err) {
    console.warn("Kobrat AI online endpoint fallback triggered:", err.message);

    // Fallback: smart heuristic answers if network/offline
    return getOfflineSmartReply(trimmed);
  }
}

// Fallback logic for offline or network issues
function getOfflineSmartReply(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes('harga') || lower.includes('biaya') || lower.includes('tarif')) {
    return `💰 Estimasi Biaya di Kobrat:
- Tugas Kuliah / Praktikum: Mulai Rp 150.000
- Landing Page Modern: Mulai Rp 350.000
- Fullstack Web App: Mulai Rp 650.000
- Skripsi & Tugas Akhir: Mulai Rp 850.000 (Free Bimbingan GMeet)
Ketik "order" atau cek menu Kalkulator di web untuk rincian lengkap!`;
  }

  if (lower.includes('siapa') && (lower.includes('kamu') || lower.includes('kobrat'))) {
    return `🐍 Kami adalah KOBRAT: circle tongkrongan persaudaraan kuliah sekaligus kolektif developer beranggotakan 8 orang (Mas Aca, Mas Plenger, Mas Nang, Mas Did, Mas Jambi, Mas Apis, Mas Vano, dan Mas JP). Kami siap bantu beresin tugas, web, bot, dan skripsi lu!`;
  }

  if (lower.includes('python') || lower.includes('loop') || lower.includes('koding')) {
    return `💻 Mau kodingan apa nih bro? 
KOBRAT squad siap bikinin mulai dari script automation, bot Telegram/Discord, web backend FastAPI/Flask, sampe model AI. Kalau mau garap projek, langsung ketik "order" ya!`;
  }

  return `🤖 [KOBRAT AI Offline Mode]
Pertanyaanmu: "${prompt}"
Koneksi ke AI server sedang sibuk/offline. Kamu bisa coba tanyakan lagi dalam beberapa detik, atau ketik "help" untuk melihat perintah shell yang tersedia!`;
}
