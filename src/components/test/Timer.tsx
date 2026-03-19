'use client';

import { useUiStore } from '@/store/uiStore';

/**
 * Timer component — subscribes ONLY to uiStore.
 * This prevents any re-render cascade to QuestionCard when timer ticks.
 */
export function Timer() {
  const timerRemainingSeconds = useUiStore((s) => s.timerRemainingSeconds);
  const timerIsRed = useUiStore((s) => s.timerIsRed);

  const minutes = Math.floor(timerRemainingSeconds / 60);
  const seconds = timerRemainingSeconds % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className={`font-mono text-2xl font-bold tabular-nums ${
        timerIsRed ? 'text-red-600' : 'text-gray-700'
      }`}
      aria-label={`Time remaining: ${display}`}
      role="timer"
    >
      {display}
    </div>
  );
}
