// components/screens/FinalScreen.tsx
'use client';
import { Stars } from '@/components/atoms/Stars';
import { BankerMascot } from '@/components/atoms/BankerMascot';
import { Figure } from '@/components/atoms/Figure';
import { TopBar } from '@/components/TopBar';
import { audio } from '@/lib/audio';
import type { GameConfig } from '@/lib/config';
import type { Case } from '@/lib/game';

interface Props {
  config: GameConfig;
  gifts: (Case & { caseNum: number })[];
  yourCase: number;
  onPick: (g: Case) => void;
}

export function FinalScreen({ config, gifts, yourCase, onPick }: Props) {
  return (
    <div className="stage">
      <Stars count={50} />
      <div className="stage-inner">
        <TopBar />
        <div className="final-screen">
          <div className="final-banker-mini">
            <BankerMascot size="100%" style={config.bankerStyle} />
          </div>
          <div className="section-divider">— PICK YOUR GIFT —</div>
          <div className="final-title">Happy Birthday, {config.playerName}</div>
          <div className="final-msg">
            The Banker honored your nerve, {config.playerName}. Forget the case you picked — choose{' '}
            <strong>any</strong> of the three. Whatever you want. It&apos;s yours.
          </div>
          <div className="gift-row">
            {gifts.map((g) => (
              <div
                key={g.num}
                className="gift-card"
                onClick={() => { if (config.audioOn) audio.click(); onPick(g); }}
              >
                {g.caseNum === yourCase && <div className="your-pick-tag">YOUR CASE</div>}
                <div className="gift-card-figure">
                  <Figure variant={g.num as 1 | 2 | 3} />
                </div>
                <div className="gname">{g.name}</div>
                <div className="case-tag">BRIEFCASE {g.caseNum}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
