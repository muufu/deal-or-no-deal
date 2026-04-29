// components/screens/PickScreen.tsx
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
  onPick: (num: number) => void;
}

export function PickScreen({ config, cases, onPick }: Props) {
  return (
    <div className="stage">
      <div className="stage-inner">
        <TopBar />
        <div className="play-layout">
          <div className="sideboard">
            <div className="sideboard-title">— Cases —</div>
            {cases.map(c => (
              <div key={c.num} className="tile">{c.num}</div>
            ))}
          </div>
          <div className="center-stage">
            <div className="instruction">
              <span className="name">{config.playerName.toUpperCase()}</span>, choose your briefcase.
            </div>
            <div className="briefcase-row">
              {cases.map(c => (
                <div
                  key={c.num}
                  className="briefcase-cell clickable"
                  onClick={() => { if (config.audioOn) audio.click(); onPick(c.num); }}
                >
                  <div className="figure-wrap">
                    <Figure variant={c.num as 1|2|3} />
                    <div className="figure-glow" />
                  </div>
                  <Briefcase state="default" size="100%" />
                  <div className="case-number">{c.num}</div>
                </div>
              ))}
            </div>
            <div className="floor-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
