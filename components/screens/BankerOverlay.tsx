// components/screens/BankerOverlay.tsx
'use client';
import { useEffect } from 'react';
import { BankerMascot } from '@/components/atoms/BankerMascot';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';

interface Props {
  config: GameConfig;
  message: string;
  dealLabel?: string;
  singleAction?: boolean;
  onDeal: () => void;
  onNoDeal: () => void;
}

export function BankerOverlay({
  config, message, dealLabel = 'DEAL', singleAction = false, onDeal, onNoDeal,
}: Props) {
  useEffect(() => {
    if (!config.audioOn) return;
    audio.ringStart();
    return () => audio.ringStop();
  }, [config.audioOn]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="The Banker is calling">
      <div className="banker-card">
        <div className="banker-calling">— THE BANKER IS CALLING —</div>
        <div className="banker-booth">
          <div className="banker-booth-label">THE BANKER</div>
          <div className="banker-phone" aria-hidden="true">📞</div>
          <div className="banker-figure">
            <BankerMascot size="100%" style={config.bankerStyle} />
          </div>
        </div>
        <div className="banker-msg" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="banker-actions">
          <button
            className="btn-choice btn-choice-deal"
            onClick={() => {
              if (config.audioOn) { audio.ringStop(); audio.deal(); }
              onDeal();
            }}
          >
            {dealLabel}
          </button>
          {!singleAction && (
            <button
              className="btn-choice btn-choice-nodeal"
              onClick={() => {
                if (config.audioOn) { audio.ringStop(); audio.noDeal(); }
                onNoDeal();
              }}
            >
              NO DEAL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
