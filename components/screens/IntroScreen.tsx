// components/screens/IntroScreen.tsx
'use client';
import { useEffect } from 'react';
import { Stars } from '@/components/atoms/Stars';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';

interface Props { config: GameConfig; onStart: () => void; }

export function IntroScreen({ config, onStart }: Props) {
  useEffect(() => {
    if (config.audioOn) {
      const t = setTimeout(() => audio.sting(), 200);
      return () => clearTimeout(t);
    }
  }, [config.audioOn]);

  return (
    <div className="stage">
      <Stars count={70} />
      <div className="stage-inner">
        <div className="intro">
          <div className="intro-badge">🎂 {config.showTitle}</div>
          <div className="intro-logo">
            <div className="word">DEAL</div>
            <div className="or">— OR —</div>
            <div className="word">NO DEAL</div>
          </div>
          <button className="btn" onClick={() => {
            if (config.audioOn) audio.click();
            onStart();
          }}>
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}
