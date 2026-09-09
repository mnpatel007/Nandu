"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type CountdownState = {
  /** null until the component has mounted — prevents hydration mismatch. */
  time: TimeLeft | null;
  /** True on 7 October itself. */
  isToday: boolean;
};

/** The birthday: 7 October, in the viewer's own timezone. */
function nextBirthday(now: Date): Date {
  const year = now.getFullYear();
  const thisYear = new Date(year, 9, 7, 0, 0, 0, 0); // month 9 === October
  const endOfDay = new Date(year, 9, 7, 23, 59, 59, 999);
  if (now > endOfDay) return new Date(year + 1, 9, 7, 0, 0, 0, 0);
  return thisYear;
}

/**
 * Counts down to 7 October. Returns null on the first render so the server
 * and the client agree, then ticks once a second.
 */
export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>({
    time: null,
    isToday: false,
  });

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const now = new Date();
      const isToday = now.getMonth() === 9 && now.getDate() === 7;
      const target = nextBirthday(now);
      const diff = Math.max(0, target.getTime() - now.getTime());
      const total = Math.floor(diff / 1000);

      setState({
        isToday,
        time: {
          days: Math.floor(total / 86400),
          hours: Math.floor((total % 86400) / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60,
        },
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(id);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
