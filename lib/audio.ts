// lib/audio.ts
// Web Audio API sound engine. Singleton — import and call directly from event handlers.
// Background music interface is stubbed: wire up by calling bgMusic.load(url) and bgMusic.play()
// when a suitable audio file is available.

let ctx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.18,
  attack = 0.005,
  release = 0.1,
  when = 0
): void {
  const c = getCtx();
  if (!c || !enabled) return;
  const t0 = c.currentTime + when;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + attack);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

function sweep(
  f1: number,
  f2: number,
  dur: number,
  type: OscillatorType = 'sawtooth',
  gain = 0.15,
  when = 0
): void {
  const c = getCtx();
  if (!c || !enabled) return;
  const t0 = c.currentTime + when;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f1, t0);
  o.frequency.exponentialRampToValueAtTime(Math.max(f2, 30), t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.linearRampToValueAtTime(0, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

let _ringInterval: ReturnType<typeof setInterval> | null = null;

// ─── Background music stub ────────────────────────────────────────────────────
// To add background music later:
//   1. Call bgMusic.load('/music/your-track.mp3') once on mount
//   2. Call bgMusic.play() when the game starts
//   3. Call bgMusic.stop() on game reset
// The volume is kept low (0.12) so it underlays sound effects without competing.

let _bgAudio: HTMLAudioElement | null = null;
let _bgLoaded = false;

export const bgMusic = {
  load(src: string): void {
    if (typeof window === 'undefined') return;
    _bgAudio = new Audio(src);
    _bgAudio.loop = true;
    _bgAudio.volume = 0.12;
    _bgLoaded = true;
  },
  play(): void {
    if (_bgLoaded && _bgAudio) _bgAudio.play().catch(() => {});
  },
  stop(): void {
    if (_bgAudio) {
      _bgAudio.pause();
      _bgAudio.currentTime = 0;
    }
  },
  setVolume(v: number): void {
    if (_bgAudio) _bgAudio.volume = Math.max(0, Math.min(1, v));
  },
};
// ─────────────────────────────────────────────────────────────────────────────

export const audio = {
  setEnabled(v: boolean): void { enabled = v; },
  isEnabled(): boolean { return enabled; },

  sting(): void {
    sweep(120, 60, 0.6, 'sawtooth', 0.18);
    tone(60, 0.7, 'sine', 0.25, 0.01, 0.6, 0.05);
  },
  click(): void { tone(660, 0.08, 'square', 0.08); },
  picked(): void {
    tone(220, 0.18, 'sine', 0.22, 0.01, 0.18, 0);
    tone(330, 0.22, 'sine', 0.18, 0.01, 0.22, 0.12);
    tone(440, 0.4, 'sine', 0.16, 0.01, 0.4, 0.26);
  },
  reveal(): void {
    [523, 659, 784, 988, 1175].forEach((f, i) => tone(f, 0.18, 'triangle', 0.16, 0.005, 0.18, i * 0.08));
  },
  ringStart(): void {
    if (_ringInterval) return;
    const ring = () => {
      tone(880, 0.18, 'sine', 0.12);
      tone(1100, 0.18, 'sine', 0.1, 0.005, 0.18, 0.22);
    };
    ring();
    _ringInterval = setInterval(ring, 1400);
  },
  ringStop(): void {
    if (_ringInterval) { clearInterval(_ringInterval); _ringInterval = null; }
  },
  deal(): void {
    [440, 554, 659, 880, 1109].forEach((f, i) => tone(f, 0.22, 'square', 0.14, 0.005, 0.22, i * 0.12));
  },
  noDeal(): void {
    sweep(660, 200, 0.5, 'sawtooth', 0.18);
    tone(120, 0.4, 'sine', 0.18, 0.005, 0.4, 0.1);
  },
  fanfare(): void {
    [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => {
      tone(f, 0.18, 'triangle', 0.14, 0.005, 0.18, i * 0.12);
      tone(f / 2, 0.18, 'sine', 0.1, 0.005, 0.18, i * 0.12);
    });
  },
};
