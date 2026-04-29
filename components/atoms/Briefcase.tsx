// components/atoms/Briefcase.tsx
type BriefcaseState = 'default' | 'selected' | 'eliminated' | 'open';

interface Props {
  state?: BriefcaseState;
  size?: number | string;
}

export function Briefcase({ state = 'default', size = 200 }: Props) {
  const isElim = state === 'eliminated';
  const isSel = state === 'selected';
  const isOpen = state === 'open';
  const lite = isElim ? '#3a4258' : '#dbe2ee';
  const mid = isElim ? '#272d3e' : '#9aa5bd';
  const deep = isElim ? '#181c2a' : '#525e7a';
  const seam = isElim ? '#0c1020' : '#2a3556';
  const glowColor = isSel ? 'var(--gold)' : 'var(--ui-blue)';
  const id = state;

  return (
    <svg viewBox="0 0 240 180" width={size} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`g-body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lite} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`g-handle-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`g-glow-${id}`} cx="0.5" cy="1" r="0.6">
          <stop offset="0%" stopColor={glowColor} stopOpacity={isElim ? 0 : isSel ? 0.7 : 0.4} />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      {!isElim && <ellipse cx="120" cy="170" rx="90" ry="14" fill={`url(#g-glow-${id})`} />}
      <ellipse cx="120" cy="172" rx="80" ry="6" fill="#000" opacity="0.5" />
      {isOpen ? (
        <g>
          <path d="M 30 95 L 30 30 Q 30 24 36 24 L 204 24 Q 210 24 210 30 L 210 95 Z"
            fill={`url(#g-body-${id})`} stroke="#1c2540" strokeWidth="2"
            transform="rotate(-25 30 95) translate(0 -10)" />
          <rect x="36" y="40" width="168" height="62" fill="#0a1340" rx="4"
            transform="rotate(-25 30 95) translate(0 -10)" />
          <rect x="30" y="95" width="180" height="60" rx="6" fill={`url(#g-body-${id})`} stroke="#1c2540" strokeWidth="2" />
          <rect x="40" y="100" width="160" height="50" fill="#0a1340" rx="4" />
        </g>
      ) : (
        <g>
          <path d="M 95 35 Q 120 8 145 35" stroke={`url(#g-handle-${id})`} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M 95 35 Q 120 18 145 35" stroke={lite} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <rect x="30" y="40" width="180" height="115" rx="8" fill={`url(#g-body-${id})`} stroke="#1c2540" strokeWidth="2" />
          {!isElim && <rect x="40" y="48" width="160" height="6" rx="3" fill={lite} opacity="0.5" />}
          {!isElim && <rect x="44" y="58" width="60" height="3" rx="1.5" fill="white" opacity="0.4" />}
          <line x1="40" y1="98" x2="200" y2="98" stroke={seam} strokeWidth="2" strokeDasharray="6 4" />
          <rect x="105" y="86" width="30" height="22" rx="3" fill={deep} stroke={seam} strokeWidth="1" />
          <circle cx="120" cy="97" r="4" fill={mid} stroke={seam} />
          {([[44,52],[196,52],[44,148],[196,148]] as [number,number][]).map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={deep} stroke={lite} strokeWidth="0.5" />
          ))}
          {isSel && (
            <rect x="26" y="36" width="188" height="123" rx="10" fill="none"
              stroke="var(--gold)" strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 12px var(--gold))' }} />
          )}
        </g>
      )}
    </svg>
  );
}
