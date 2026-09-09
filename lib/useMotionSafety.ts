"use client";

import { useEffect } from "react";

/* ============================================================================
   useMotionSafety
   ----------------------------------------------------------------------------
   Every entrance animation on this site starts from opacity 0. That is the
   right look — but it means that if the animation engine never gets to run,
   the page is a black screen and she sees nothing at all.

   requestAnimationFrame can genuinely stall: a tab restored in the background,
   an aggressive battery saver, an embedded in-app browser, a stalled main
   thread. So this watches for a first animation frame using a plain timer
   (which keeps running when rAF does not). If no frame has arrived in time,
   it marks the document and CSS forces everything back to a readable state.

   The site degrades to a plain, still, perfectly legible page instead of a
   black one. It should almost never fire — that is the point.
   ========================================================================== */

const GRACE_MS = 2200;

export function useMotionSafety() {
  useEffect(() => {
    const root = document.documentElement;
    let sawFrame = false;

    const handle = requestAnimationFrame(() => {
      sawFrame = true;
      root.classList.remove("no-raf");
    });

    const timer = window.setTimeout(() => {
      if (!sawFrame) root.classList.add("no-raf");
    }, GRACE_MS);

    /* If the tab was hidden on load, rAF resumes when she comes back to it. */
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(() => {
          sawFrame = true;
          root.classList.remove("no-raf");
        });
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelAnimationFrame(handle);
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
}
