// components/atoms/Figure.tsx
import Image from 'next/image';

const FIGURE_SRC: Record<number, string> = {
  1: '/figures/marissa-1.png',
  2: '/figures/marissa-2.png',
  3: '/figures/marissa-3.png',
};

interface Props {
  variant?: 1 | 2 | 3;
}

export function Figure({ variant = 1 }: Props) {
  return (
    <Image
      src={FIGURE_SRC[variant] ?? FIGURE_SRC[1]}
      alt=""
      fill
      className="figure-img"
      style={{ objectFit: 'contain', objectPosition: 'bottom' }}
      draggable={false}
      priority
    />
  );
}
