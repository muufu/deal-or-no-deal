// lib/game.ts
import type { GameConfig } from './config';

export type Phase =
  | 'intro'
  | 'pick'
  | 'picked'
  | 'open'
  | 'reveal'
  | 'banker'
  | 'banker_final'
  | 'reveal_your'
  | 'final'
  | 'celebration';

export interface Case {
  num: 1 | 2 | 3;
  name: string;
  desc: string;
  icon: string;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildCases(config: GameConfig): Case[] {
  const shuffled = shuffle(config.gifts);
  return ([1, 2, 3] as const).map((num, i) => ({ num, ...shuffled[i] }));
}

export function bankerOffer(
  opened: number[],
  cases: Case[],
  yourCase: number
): Case | null {
  const remaining = cases.filter(c => !opened.includes(c.num) && c.num !== yourCase);
  return remaining[0] ?? null;
}

export function bankerLine(
  config: GameConfig,
  opened: number[],
  offerCase: Case
): string {
  if (opened.length === 1) {
    return `So <strong>${config.playerName}</strong>... I have an offer for you. <span class="amount">${offerCase.name}</span> is on the table. Take it now and walk away clean — <em>or</em> tempt fate and open the last case. <em>Deal, or no deal?</em>`;
  }
  return `Last chance, ${config.playerName}. I'll put <span class="amount">${offerCase.name}</span> back on the table — yours if you take it now. Or hold your case and live with whatever's inside. <em>Deal, or no deal?</em>`;
}

export function bankerFinalLine(config: GameConfig): string {
  return `Bold move, <strong>${config.playerName}</strong>. You walked away from every offer I put on the table. I respect that. So here's my final move — forget the case you picked. <em>Pick <strong>any</strong> of the three.</em> Whatever you want. <em>Happy birthday.</em>`;
}
