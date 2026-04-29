// components/screens/PickedScreen.tsx
'use client';
import { useEffect } from 'react';
import { Stars } from '@/components/atoms/Stars';
import { Figure } from '@/components/atoms/Figure';
import { TopBar } from '@/components/TopBar';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';

interface Props {
  config: GameConfig;
  caseNum: 1 | 2 | 3;
  onContinue: () => void;
}

export function PickedScreen({ config, caseNum, onContinue }: Props) {
  useEffect(() => {
    if (config.audioOn) {
      const t = setTimeout(() => audio.picked(), 600);
      return () => clearTimeout(t);
    }
  }, [config.audioOn]);

  return (
    <div className="stage">
      <Stars count={40} />
      <div className="stage-inner">
        <TopBar />
        <div className="picked-screen">
          <div className="picked-label">— YOU&apos;VE PICKED —</div>
          <div className="picked-case-word">CASE</div>
          <div className="picked-case-num">{caseNum}</div>
          <div className="picked-figure">
            <Figure variant={caseNum} />
            <div className="picked-figure-glow" />
          </div>
          <div className="picked-msg">
            Your fate is sealed, {config.playerName}. Whatever&apos;s inside is yours to discover.
            Now let&apos;s see what the other briefcases are hiding...
          </div>
          <div className="picked-cta">
            <button className="btn btn-gold" onClick={() => {
              if (config.audioOn) audio.click();
              onContinue();
            }}>
              Open The Others →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
