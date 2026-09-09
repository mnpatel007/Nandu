# Nandini — Trailer

A cinematic scroll experience. Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion 11.

## Run it

```bash
npm run dev
```

Then open <http://localhost:3000>.

For the fast, production version (this is what she should see):

```bash
npm run build && npm start
```

## Where everything lives

| File | What it does |
| --- | --- |
| `app/page.tsx` | Orchestrator — the four scenes in order, scroll progress bar, motion safety |
| `app/layout.tsx` | Fonts (Playfair Display + Manrope), metadata |
| `app/globals.css` | Design tokens, glassmorphism, glow utilities, the animation failsafe |
| `components/BackgroundGlow.tsx` | Breathing radial gradients — cool at the start, warm by the end |
| `components/HeroHook.tsx` | Scene 1 — the breath, then her name |
| `components/MemoryGallery.tsx` | Scene 2 — floating 3D-tilted glass cards + the comforting lines |
| `components/TheClimax.tsx` | Scene 3 — the quote, built word by word from scroll position |
| `components/TrailerOutro.tsx` | Scene 4 — particle dissolve, the date, countdown, the button |
| `components/AudioPlayer.tsx` | Ambient music, synthesised in code |
| `lib/memories.ts` | **The only file you need to edit to change photos or captions** |
| `lib/useCountdown.ts` | Counts to 7 October in her timezone |
| `lib/useMotionSafety.ts` | Failsafe so the page can never render as a blank screen |

## Changing what she sees

Everything visual is in **`lib/memories.ts`**. It is one ordered list: photo, photo,
line of text, photo, video, line of text… Reorder it, add to it, rewrite the captions.
Photos live in `public/media/` and are referenced as `/media/<filename>`.

To add a photo: drop the file into `public/media/`, then add an entry:

```ts
{
  type: "memory",
  data: {
    src: "/media/YOUR-PHOTO.jpg",
    alt: "kaik description",
    caption: "optional line under the frame",
    side: "left",   // left | right | center
    size: "md",     // sm | md | lg
  },
},
```

`rotate: true` is for photos stored sideways (shot lying down). It turns them a
quarter turn anticlockwise inside a landscape frame.

## Music

There is no audio file — the ambient track is generated live with the Web Audio API
(a warm pad under a slow, randomised pentatonic figure). It never loops audibly.

To use a real song instead: put an mp3 at `public/media/song.mp3` and set
`USE_FILE = true` at the top of `components/AudioPlayer.tsx`.

## Putting it online

The easiest route is Vercel:

```bash
npx vercel
```

Follow the prompts. It gives you a link you can send her.
