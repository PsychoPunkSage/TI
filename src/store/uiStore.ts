import { create } from 'zustand';

interface UiState {
  timerRemainingSeconds: number;
  timerIsRed: boolean;
  timerActive: boolean;
}

interface UiActions {
  setTimerRemaining: (seconds: number) => void;
  startTimer: (initialSeconds: number) => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useUiStore = create<UiState & UiActions>((set) => ({
  timerRemainingSeconds: 240,
  timerIsRed: false,
  timerActive: false,

  setTimerRemaining: (seconds: number) =>
    set({ timerRemainingSeconds: seconds, timerIsRed: seconds <= 30 }),

  startTimer: (initialSeconds: number) =>
    set({
      timerRemainingSeconds: initialSeconds,
      timerIsRed: initialSeconds <= 30,
      timerActive: true,
    }),

  stopTimer: () => set({ timerActive: false }),

  resetTimer: () =>
    set({ timerRemainingSeconds: 240, timerIsRed: false, timerActive: false }),
}));
