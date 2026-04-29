// components/TopBar.tsx
import { CONFIG } from '@/lib/config';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="logo-mini">
        <span>DEAL</span>
        <span className="em">·</span>
        <span>NO DEAL</span>
      </div>
      <span className="show-tag">{CONFIG.showTitle}</span>
    </div>
  );
}
