// components/screens/RevealOverlay.tsx
'use client';
import { useState, useEffect } from 'react';
import { Briefcase } from '@/components/atoms/Briefcase';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';
import type { Case } from '@/lib/game';

interface Props {
  config: GameConfig;
  gift: Case;
  title?: string;
  onContinue: () => void;
}

export function RevealOverlay({ config, gift, title, onContinue }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => { setStage(2); if (config.audioOn) audio.reveal(); }, 1700),
      setTimeout(() => setStage(3), 2400),
      setTimeout(() => setStage(4), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [config.audioOn]);

  return (
    <div className="overlay reveal-overlay" data-stage={stage}>
      <div className="reveal-card">
        {title && <div className="reveal-title-overline">{title}</div>}
        <div className="reveal-stage-wrap">
          <div className="reveal-flare" />
          <div className={`reveal-case-stage stage-${stage}`}>
            {stage < 2 ? (
              <div className="reveal-case-closed">
                <Briefcase state="default" size="100%" />
                <div className="reveal-case-num">{gift.num}</div>
              </div>
            ) : (
              <div className="reveal-case-opened">
                <Briefcase state="open" size="100%" />
              </div>
            )}
          </div>
          <div className={`reveal-contents stage-${stage}`}>
            <div className="reveal-icon">{gift.icon}</div>
            <div className="reveal-name">{gift.name}</div>
            <div className="reveal-desc">{gift.desc}</div>
          </div>
        </div>
        <div className={`reveal-cta stage-${stage}`}>
          <button className="btn btn-gold" onClick={onContinue}>Continue →</button>
          {stage < 4 && (
            <button className="btn btn-ghost reveal-skip" onClick={() => setStage(4)}>Skip ▸</button>
          )}
        </div>
      </div>
    </div>
  );
}
