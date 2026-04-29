// components/screens/OpenScreen.tsx
'use client';
import { Briefcase } from '@/components/atoms/Briefcase';
import { Figure } from '@/components/atoms/Figure';
import { TopBar } from '@/components/TopBar';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';
import type { Case } from '@/lib/game';

interface Props {
  config: GameConfig;
  cases: Case[];
  yourCase: number;
  opened: number[];
  onOpen: (num: number) => void;
}

export function OpenScreen({ config, cases, yourCase, opened, onOpen }: Props) {
  return (
    <div className="stage">
      <div className="stage-inner">
        <TopBar />
        <div className="play-layout">
          <div className="sideboard">
            <div className="sideboard-title">— Cases —</div>
            {cases.map(c => {
              const isElim = opened.includes(c.num);
              const isYou = c.num === yourCase;
              return (
                <div key={c.num} className={`tile ${isElim ? 'eliminated' : ''} ${isYou ? 'you' : ''}`}>
                  {c.num}
                </div>
              );
            })}
          </div>
          <div className="center-stage">
            <div className="instruction">Please open another briefcase.</div>
            <div className="briefcase-row">
              {cases.map(c => {
                const isElim = opened.includes(c.num);
                const isYou = c.num === yourCase;
                const clickable = !isElim && !isYou;
                return (
                  <div
                    key={c.num}
                    className={`briefcase-cell ${clickable ? 'clickable' : ''} ${isElim ? 'eliminated' : ''} ${isYou ? 'you' : ''}`}
                    onClick={clickable ? () => { if (config.audioOn) audio.click(); onOpen(c.num); } : undefined}
                  >
                    <div className="figure-wrap">
                      <Figure variant={c.num as 1 | 2 | 3} />
                      {!isElim && <div className="figure-glow" />}
                    </div>
                    <Briefcase state={isElim ? 'eliminated' : isYou ? 'selected' : 'default'} size="100%" />
                    <div className="case-number">{c.num}</div>
                  </div>
                );
              })}
            </div>
            <div className="floor-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
