"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SecretVault() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorHint, setErrorHint] = useState(false);
  const [userWish, setUserWish] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [shootingStarActive, setShootingStarActive] = useState(false);

  const checkPasscode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === "nandu" || clean === "nandini" || clean === "7" || clean === "meet") {
      unlockVault();
    } else {
      setErrorHint(true);
      setTimeout(() => setErrorHint(false), 3000);
    }
  };

  const unlockVault = () => {
    setIsUnlocked(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "chime" }));
    }
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    setWishSent(true);
    setShootingStarActive(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "bell" }));
    }
    setTimeout(() => {
      setShootingStarActive(false);
    }, 2500);
  };

  return (
    <section
      id="secret-vault"
      aria-label="Secret Heart Vault"
      className="relative min-h-[90svh] py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Shooting Star Animation Layer */}
      {shootingStarActive && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <div className="absolute top-[20%] right-[15%] w-48 h-0.5 bg-gradient-to-l from-white via-gold to-transparent animate-shooting-star" />
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-rose mb-3"
        >
          Protected Devotion
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,3.8rem)] font-light text-ether text-glow leading-tight"
        >
          The Secret Heart Vault
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          A sacred compartment locked with a heart key, reserved only for Nandini.
        </motion.p>
      </div>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* LOCKED STATE */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-3xl p-8 sm:p-10 border border-gold/30 shadow-[0_20px_60px_-15px_rgba(243,201,139,0.2)] text-center flex flex-col items-center"
            >
              {/* Golden Padlock Icon */}
              <div className="relative mb-6">
                <div className="gold-seal h-20 w-20 rounded-full flex items-center justify-center text-3xl shadow-xl">
                  🔒
                </div>
                <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-rose text-white text-[10px] grid place-items-center font-bold">
                  ♥
                </span>
              </div>

              <h3 className="font-display text-xl text-gold font-medium mb-2">
                Locked with Love
              </h3>
              <p className="text-xs text-haze mb-6 max-w-xs">
                Enter your nickname or birth date to unlock, or use Meet's master key below.
              </p>

              {/* Passcode Form */}
              <form onSubmit={checkPasscode} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Hint: Nandu / 7 / Meet"
                    className="w-full px-5 py-3 rounded-full glass text-sm text-ether placeholder:text-haze/50 border border-white/15 focus:outline-none focus:border-gold transition-colors text-center"
                  />
                  {errorHint && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-rose mt-2"
                    >
                      Incorrect key. Try "Nandu" or tap Meet's Key below!
                    </motion.p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button
                    type="submit"
                    className="glass px-6 py-2.5 rounded-full text-xs font-light text-gold border border-gold/40 hover:bg-gold/15 transition-all"
                  >
                    Unlock with Code
                  </button>

                  <button
                    type="button"
                    onClick={unlockVault}
                    className="glass px-6 py-2.5 rounded-full text-xs font-light text-rose border border-rose/40 hover:bg-rose/15 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Use Meet's Key</span>
                    <span>🗝️</span>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* UNLOCKED VAULT & WISHING WELL */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="parchment rounded-3xl p-8 sm:p-10 border border-gold/40 shadow-2xl space-y-8"
            >
              {/* Unlocked Message */}
              <div className="text-center space-y-3 pb-6 border-b border-gold/20">
                <span className="text-3xl">🔓💖</span>
                <h3 className="font-display text-2xl text-gold font-medium">
                  Welcome to My Unfiltered Heart
                </h3>
                <p className="font-display text-base leading-relaxed text-ether/95 italic">
                  "Nandini, tame mara mate shu cho ae shabdo ma nathi kai shakato. Tu mara aatma no aek aevo hisso che je kadach me potana ma pan nathi joyo. Tu khush rahe, hasti rahe, bas aatlu j maru aakhu lakshya che."
                </p>
                <span className="text-xs font-mono text-rose tracking-wider block">
                  — Meet's Sacred Truth
                </span>
              </div>

              {/* The Wishing Star Interactive Box */}
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest text-gold font-light">
                    ✦ The Wishing Star ✦
                  </span>
                  <p className="text-xs text-haze mt-1 italic">
                    Type a wish into the cosmos. Meet promises to do everything to grant it.
                  </p>
                </div>

                {!wishSent ? (
                  <form onSubmit={submitWish} className="space-y-3">
                    <input
                      type="text"
                      value={userWish}
                      onChange={(e) => setUserWish(e.target.value)}
                      placeholder="Make a wish, Nandini... (e.g. Always stay happy)"
                      className="w-full px-5 py-3 rounded-2xl glass text-sm text-ether placeholder:text-haze/60 border border-gold/30 focus:outline-none focus:border-rose transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose/30 via-gold/30 to-rose/30 border border-gold/50 text-ether text-xs font-light tracking-wider hover:brightness-125 transition-all shadow-[0_0_20px_rgba(243,201,139,0.2)]"
                    >
                      🌟 Release Wish into the Universe
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-gold/10 border border-gold/30 text-center space-y-2"
                  >
                    <span className="text-2xl">✨</span>
                    <p className="font-display text-sm text-gold">
                      Your wish has been received by the universe:
                    </p>
                    <p className="font-display italic text-ether text-base">
                      "{userWish}"
                    </p>
                    <p className="text-[11px] text-rose italic pt-1">
                      Meet has locked this in his heart forever.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

