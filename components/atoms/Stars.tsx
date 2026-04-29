// components/atoms/Stars.tsx
'use client';
import { useMemo } from 'react';

interface Props { count?: number; }

export function Stars({ count = 60 }: Props) {
  const stars = useMemo(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 1 + Math.random() * 2,
    })), [count]);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <div key={i} className="star" style={{
          left: `${s.left}%`, top: `${s.top}%`,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`,
          animationDuration: `${s.duration}s`,
        }} />
      ))}
    </div>
  );
}
