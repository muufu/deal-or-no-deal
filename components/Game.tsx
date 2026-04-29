// components/Game.tsx
'use client';
import { useState, useCallback } from 'react';
import { CONFIG } from '@/lib/config';
import { buildCases, bankerOffer, bankerLine, bankerFinalLine } from '@/lib/game';
import type { Phase, Case } from '@/lib/game';
import { IntroScreen } from '@/components/screens/IntroScreen';
import { PickScreen } from '@/components/screens/PickScreen';
import { PickedScreen } from '@/components/screens/PickedScreen';
import { OpenScreen } from '@/components/screens/OpenScreen';
import { RevealOverlay } from '@/components/screens/RevealOverlay';
import { BankerOverlay } from '@/components/screens/BankerOverlay';
import { FinalScreen } from '@/components/screens/FinalScreen';
import { CelebrationScreen } from '@/components/screens/CelebrationScreen';

export function Game() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [cases, setCases] = useState<Case[]>(() => buildCases(CONFIG));
  const [yourCase, setYourCase] = useState<number | null>(null);
  const [opened, setOpened] = useState<number[]>([]);
  const [pendingReveal, setPendingReveal] = useState<number | null>(null);
  const [chosenGift, setChosenGift] = useState<Case | null>(null);
  const [currentOffer, setCurrentOffer] = useState<Case | null>(null);

  const reset = useCallback(() => {
    setPhase('intro');
    setYourCase(null);
    setOpened([]);
    setPendingReveal(null);
    setChosenGift(null);
    setCurrentOffer(null);
    setCases(buildCases(CONFIG));
  }, []);

  const start = () => setPhase('pick');
  const pick = (num: number) => { setYourCase(num); setPhase('picked'); };
  const goToOpen = () => setPhase('open');
  const open = (num: number) => { setPendingReveal(num); setPhase('reveal'); };

  const afterReveal = () => {
    const newOpened = [...opened, pendingReveal!];
    setOpened(newOpened);
    setPendingReveal(null);
    const offer = bankerOffer(newOpened, cases, yourCase!);
    setCurrentOffer(offer);
    setPhase('banker');
  };

  const onDeal = () => {
    if (currentOffer) setChosenGift(currentOffer);
    setPendingReveal(yourCase);
    setPhase('reveal_your');
  };

  const afterRevealYour = () => {
    setPendingReveal(null);
    setPhase('celebration');
  };

  const onNoDeal = () => {
    setCurrentOffer(null);
    const remainingStrangers = cases.filter(
      c => !opened.includes(c.num) && c.num !== yourCase
    ).length;
    setPhase(remainingStrangers === 0 ? 'banker_final' : 'open');
  };

  const onFinalDealAccept = () => setPhase('final');

  const yourCaseObj = cases.find(c => c.num === yourCase) ?? null;
  const pendingObj = cases.find(c => c.num === pendingReveal) ?? null;
  const isOpenPhase = ['open', 'banker', 'banker_final', 'reveal', 'reveal_your'].includes(phase);

  return (
    <>
      {phase === 'intro' && <IntroScreen config={CONFIG} onStart={start} />}
      {phase === 'pick' && <PickScreen config={CONFIG} cases={cases} onPick={pick} />}
      {phase === 'picked' && yourCase && (
        <PickedScreen config={CONFIG} caseNum={yourCase as 1 | 2 | 3} onContinue={goToOpen} />
      )}
      {isOpenPhase && yourCase && (
        <OpenScreen config={CONFIG} cases={cases} yourCase={yourCase} opened={opened} onOpen={open} />
      )}
      {phase === 'reveal' && pendingObj && (
        <RevealOverlay config={CONFIG} gift={pendingObj} onContinue={afterReveal} />
      )}
      {phase === 'reveal_your' && pendingObj && (
        <RevealOverlay config={CONFIG} gift={pendingObj} title="And in your case..." onContinue={afterRevealYour} />
      )}
      {phase === 'banker' && currentOffer && (
        <BankerOverlay
          config={CONFIG}
          message={bankerLine(CONFIG, opened, currentOffer)}
          onDeal={onDeal}
          onNoDeal={onNoDeal}
        />
      )}
      {phase === 'banker_final' && (
        <BankerOverlay
          config={CONFIG}
          message={bankerFinalLine(CONFIG)}
          dealLabel="ACCEPT"
          singleAction
          onDeal={onFinalDealAccept}
          onNoDeal={() => {}}
        />
      )}
      {phase === 'final' && yourCase && yourCaseObj && (
        <FinalScreen
          config={CONFIG}
          gifts={cases.map(c => ({ ...c, caseNum: c.num }))}
          yourCase={yourCase}
          onPick={(g) => { setChosenGift(g); setPhase('celebration'); }}
        />
      )}
      {phase === 'celebration' && chosenGift && (
        <CelebrationScreen config={CONFIG} gift={chosenGift} onReplay={reset} />
      )}
      {phase !== 'intro' && (
        <button className="replay" onClick={reset}>↺ RESTART</button>
      )}
    </>
  );
}
