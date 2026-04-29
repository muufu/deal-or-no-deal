// components/TopBar.tsx
import type { GameConfig } from '@/lib/config';

interface Props { config: GameConfig; }

export function TopBar({ config }: Props) {
  return (
    <div className="topbar">
      <div className="logo-mini">
        <span>DEAL</span>
        <span className="em">·</span>
        <span>NO DEAL</span>
      </div>
      <div className="show-tag">🎂&nbsp;{config.showTitle}</div>
    </div>
  );
}
