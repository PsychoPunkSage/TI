import { useEffect, useRef, useCallback } from 'react';
import { useUiStore } from '@/store/uiStore';

interface UseTimerOptions {
  onExpiry: () => void;
}

interface UseTimerReturn {
  start: (seconds: number) => void;
  stop: () => void;
  reset: () => void;
}

export function useTimer({ onExpiry }: UseTimerOptions): UseTimerReturn {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { setTimerRemaining, startTimer, stopTimer, resetTimer } = useUiStore();
  const onExpiryRef = useRef(onExpiry);

  // Keep ref up to date without re-creating start/stop/reset
  useEffect(() => {
    onExpiryRef.current = onExpiry;
  }, [onExpiry]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopTimer();
  }, [stopTimer]);

  const start = useCallback(
    (seconds: number) => {
      // Clear any existing interval
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      startTimer(seconds);

      let remaining = seconds;
      intervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setTimerRemaining(0);
          stopTimer();
          onExpiryRef.current();
        } else {
          setTimerRemaining(remaining);
        }
      }, 1000);
    },
    [startTimer, setTimerRemaining, stopTimer]
  );

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    resetTimer();
  }, [resetTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { start, stop, reset };
}
