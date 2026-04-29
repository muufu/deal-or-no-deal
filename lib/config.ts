// lib/config.ts

export interface GiftConfig {
  name: string;
  desc: string;
  icon: string;
}

export interface GameConfig {
  playerName: string;
  giverName: string;
  showTitle: string;
  gifts: [GiftConfig, GiftConfig, GiftConfig];
  finalMessage: string;
  theme: 'classic' | 'arcade' | 'luxe';
  bankerStyle: 'mascot' | 'silhouette';
  audioOn: boolean;
}

export const CONFIG: GameConfig = {
  playerName: 'Edmund',
  giverName: 'Marissa',
  showTitle: 'EDBOO BIRTHDAY EDITION',
  gifts: [
    { name: 'Meta VR Experience',      desc: 'Step into another world together.',      icon: '🥽' },
    { name: 'Tang Dynasty Banquet & Show', desc: 'A royal feast and show fit for the courts of the Tang Dynasty.', icon: '🏮' },
    { name: 'Spa & Massage Day',        desc: 'Hands-off the laptop, hands-on the calm.', icon: '🌿' },
  ],
  finalMessage: "Happy birthday ❤️ briefcase or not we always make the best deals together. Can't wait to celebrate you, I love you ❤️",
  theme: 'luxe',
  bankerStyle: 'silhouette',
  audioOn: true,
};
