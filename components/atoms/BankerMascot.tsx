// components/atoms/BankerMascot.tsx
interface Props {
  size?: number | string;
  style?: 'mascot' | 'silhouette';
}

export function BankerMascot({ size = 200, style = 'mascot' }: Props) {
  if (style === 'silhouette') {
    return (
      <svg viewBox="0 0 200 240" width={size} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sil-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--ui-blue)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--ui-blue)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="200" height="240" fill="url(#sil-glow)" />
        <ellipse cx="100" cy="60" rx="32" ry="36" fill="#000" />
        <path d="M 50 130 Q 50 100 80 96 L 120 96 Q 150 100 150 130 L 150 240 L 50 240 Z" fill="#000" />
        <path d="M 130 110 Q 152 110 158 86 Q 162 70 152 64 Q 144 60 138 70 Q 134 78 130 86 Z" fill="#000" />
        <rect x="148" y="56" width="14" height="22" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
        <path d="M 96 96 L 104 96 L 108 130 L 100 145 L 92 130 Z" fill="#1a1a1a" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 240" width={size} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="msc-bodyGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#5a8eff" />
          <stop offset="100%" stopColor="#1a3aa0" />
        </radialGradient>
        <radialGradient id="msc-headGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#6a9eff" />
          <stop offset="100%" stopColor="#1a3aa0" />
        </radialGradient>
        <radialGradient id="msc-bellyGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#dde6ff" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="170" rx="62" ry="55" fill="url(#msc-bodyGrad)" />
      <ellipse cx="100" cy="180" rx="40" ry="38" fill="url(#msc-bellyGrad)" />
      <path d="M 60 140 L 100 165 L 80 200 Z" fill="#0a1340" />
      <path d="M 140 140 L 100 165 L 120 200 Z" fill="#0a1340" />
      <path d="M 92 158 L 84 152 L 84 168 L 92 162 Z M 108 158 L 116 152 L 116 168 L 108 162 Z" fill="var(--gold)" />
      <circle cx="100" cy="160" r="2.5" fill="var(--gold-deep)" />
      <circle cx="100" cy="80" r="48" fill="url(#msc-headGrad)" />
      <ellipse cx="100" cy="92" rx="36" ry="32" fill="#f3f5ff" />
      <ellipse cx="86" cy="76" rx="9" ry="11" fill="#fff" stroke="#0a1340" strokeWidth="1.5" />
      <ellipse cx="114" cy="76" rx="9" ry="11" fill="#fff" stroke="#0a1340" strokeWidth="1.5" />
      <circle cx="88" cy="78" r="3" fill="#0a0d18" />
      <circle cx="112" cy="78" r="3" fill="#0a0d18" />
      <circle cx="89" cy="76" r="1" fill="#fff" />
      <circle cx="113" cy="76" r="1" fill="#fff" />
      <circle cx="100" cy="92" r="2.5" fill="#0a0d18" />
      <path d="M 90 104 Q 100 112 110 104" stroke="#0a0d18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="148" cy="120" rx="16" ry="22" fill="url(#msc-bodyGrad)" transform="rotate(-20 148 120)" />
      <circle cx="160" cy="92" r="11" fill="#fff" stroke="#0a1340" strokeWidth="1.5" />
      <rect x="155" y="60" width="14" height="28" rx="3" fill="#0a0d18" stroke="#fff" strokeWidth="1" transform="rotate(15 162 74)" />
      <rect x="157" y="64" width="10" height="20" rx="1" fill="#1a3aff" transform="rotate(15 162 74)" />
      <ellipse cx="48" cy="170" rx="14" ry="20" fill="url(#msc-bodyGrad)" />
      <circle cx="42" cy="194" r="10" fill="#fff" stroke="#0a1340" strokeWidth="1.5" />
      <ellipse cx="78" cy="222" rx="14" ry="6" fill="#0a0d18" />
      <ellipse cx="122" cy="222" rx="14" ry="6" fill="#0a0d18" />
    </svg>
  );
}
