// Modern Web Audio API Synthesizer for Lo-Fi Cyber Ambient Tongkrongan
// Zero external assets needed, pure in-browser synthesized chill chord pads

class AmbientPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.filterNode = null;
    this.timer = null;
    this.currentChord = 0;

    // Chill Neo-Soul / Lo-Fi chord frequencies (Hz)
    // Dm9 -> G13 -> Cmaj9 -> Am7
    this.chords = [
      [146.83, 220.00, 261.63, 329.63, 392.00], // Dm9
      [196.00, 246.94, 329.63, 392.00, 440.00], // G13
      [130.81, 196.00, 246.94, 293.66, 392.00], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 523.25], // Am7
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.playProgression();
  }

  playProgression() {
    if (!this.isPlaying || !this.ctx) return;

    this.stopCurrentChord();

    // Create low-pass filter for cozy warm lofi sound
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(650, this.ctx.currentTime);

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.2);

    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    const freqs = this.chords[this.currentChord];
    this.oscillators = freqs.map((freq) => {
      const osc = this.ctx.createOscillator();
      // Triangle wave has that warm electric rhodes/pad quality
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Micro detune for lush chorus feeling
      const detune = (Math.random() - 0.5) * 8;
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      osc.connect(this.filterNode);
      osc.start();
      return osc;
    });

    this.currentChord = (this.currentChord + 1) % this.chords.length;

    // Switch chord every 3.8 seconds
    this.timer = setTimeout(() => {
      if (this.isPlaying) {
        this.playProgression();
      }
    }, 3800);
  }

  stopCurrentChord() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch (e) {
        // Safe fallback
      }
    }
    if (this.oscillators.length) {
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.oscillators = [];
      }, 500);
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  stop() {
    this.isPlaying = false;
    this.stopCurrentChord();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientSynth = new AmbientPlayer();
