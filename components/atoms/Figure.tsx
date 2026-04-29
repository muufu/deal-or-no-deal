// components/atoms/Figure.tsx
// Using a plain <img> tag — next/image fill doesn't work reliably inside
// flex containers with align-items: flex-end (the image collapses to zero).
// The figure-img class handles sizing: height:100%, width:auto, object-fit:contain.

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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={FIGURE_SRC[variant] ?? FIGURE_SRC[1]}
      alt=""
      draggable={false}
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '100%',
        width: 'auto',
        maxWidth: 'none',
        objectFit: 'contain',
        objectPosition: 'bottom',
      }}
    />
  );
}
