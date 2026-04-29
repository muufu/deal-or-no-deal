// components/atoms/Confetti.tsx
'use client';
import { useMemo } from 'react';

const COLORS = ['var(--ui-blue)', 'var(--gold)', '#ffffff', '#c01515', '#5a8eff', '#ffe08a'];

interface Props { count?: number; }

export function Confetti({ count = 80 }: Props) {
  const pieces = useMemo(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      bg: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? 'circle' : 'square',
      size: 6 + Math.random() * 10,
    })), [count]);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <div key={i} className={`confetti-piece ${p.shape}`} style={{
          left: `${p.left}%`,
          background: p.bg,
          width: `${p.size}px`,
          height: `${p.size * 1.4}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }} />
      ))}
    </div>
  );
}
