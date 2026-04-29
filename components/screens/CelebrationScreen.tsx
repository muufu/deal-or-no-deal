// components/screens/CelebrationScreen.tsx
'use client';
import { useEffect } from 'react';
import { Confetti } from '@/components/atoms/Confetti';
import { Stars } from '@/components/atoms/Stars';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';
import type { Case } from '@/lib/game';

interface Props {
  config: GameConfig;
  gift: Case;
  onReplay: () => void;
}

export function CelebrationScreen({ config, gift, onReplay }: Props) {
  useEffect(() => {
    if (!config.audioOn) return;
    const t = setTimeout(() => audio.fanfare(), 200);
    return () => clearTimeout(t);
  }, [config.audioOn]);

  return (
    <div className="stage">
      <Confetti count={120} />
      <Stars count={40} />
      <div className="stage-inner">
        <div className="celebration">
          <div className="celeb-icon">{gift.icon}</div>
          <div className="section-divider">— YOU CHOSE —</div>
          <div className="celeb-title">{gift.name}</div>
          <div className="celeb-msg">{config.finalMessage}</div>
          <div className="celeb-sign">— {config.giverName}</div>
          <button className="btn btn-ghost" onClick={onReplay} style={{ marginTop: 24 }}>
            ↺ Play again
          </button>
        </div>
      </div>
    </div>
  );
}
