---
name: basty-motion-website
description: "Production workflow and build rules for the Basty scroll-driven cinematic motion website built with Claude Code, Higgsfield MCP, GPT Image 2, Seedance 2.0, Vite, React, GSAP, Lenis, and ScrollTrigger. Use whenever working on the Basty landing page, its AI-generated cake images, the sequential rotational cake-assembly scroll video, catalog visuals, the scroll-scrubbed background video, the React implementation, or asset-replacement workflows. Triggers: basty, motion website, scroll-driven website, Higgsfield MCP, GSAP, Lenis, ScrollTrigger, Seedance 2.0, GPT Image 2, cake landing page."
---

# Basty Motion Website — Production Workflow

Build rules and AI media triggers for **Basty**, a premium custom-cake / luxury-dessert
brand. The deliverable is a single-page, scroll-driven cinematic landing page where smooth
page scrolling scrubs an AI-generated product film frame-by-frame, showing the layered
creation and rotational assembly of a signature cake.

> Positioning north star (must reinforce across logs, copy, assets):
> **"Claude Code Can Now Build Cinematic Motion Websites with AI-Generated Video."**
> Claude Code acts as an end-to-end production assistant: managing brand tokens, building
> local structure, parsing prompts, generating assets via Higgsfield, optimizing raw video
> playback vectors, and implementing robust scroll-timeline animations.

## 1. Project Concept & Facts

- **Project type:** Scroll-driven cinematic product landing page.
- **Brand focus:** Basty — high-end tailored cakes & dark-chocolate craft.
- **Flagship product:** The Signature Basty Rotational Cake.
- **Core interaction:** Scroll-scrubbed AI video background where user scroll assembles the cake.
- **Video mechanism:** Product develops over 4 distinct 180° rotations:
  Sponge base → Cream core → Chocolate enrobing → Topping attachment.
- **Stack:** Vite + React + GSAP + Lenis + ScrollTrigger + FFmpeg.
- **Aesthetic:** Premium dark mode, deep chocolate craft, sharp contrast, refined typography.
  Avoid generic web templates; feel like an elite patisserie campaign.

## 2. Project Root Architecture

Create and maintain this workspace inside the local project folder:

```
basty-motion-website/
├── assets/
│   ├── images/
│   │   ├── hero-cake.png
│   │   ├── assembly-sponge-vanilla.png
│   │   ├── ingredients-chocolate-nuts.png
│   │   ├── catalog-korean-minimalist.png
│   │   ├── catalog-dark-truffle.png
│   │   ├── catalog-themed-party.png
│   │   └── catalog-classic-wedding.png
│   └── videos/
│       ├── basty-scroll-background-raw.mp4
│       └── basty-scroll-background-all-keyframe.mp4
├── copy/
│   ├── brand-kit.md
│   ├── asset-plan.md
│   ├── image-prompts.md
│   ├── video-prompt.md
│   └── website-brief.md
├── scripts/
│   └── swap-bg-video.sh
└── website/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── App.jsx
    │   ├── motion.js
    │   └── data/cakes.js
    └── public/
        ├── bg.mp4
        └── img/
```

## 3. Brand Design System Tokens

Premium dark mode inspired by deep chocolate craft and artisanal baking.

```css
:root {
  --bg: #1A1412;        /* Deep Cocoa Black */
  --bg-2: #241D1A;      /* Roasted Graphite */
  --surface: #2E2522;   /* Card Brown-Black */
  --surface-2: #382D2A; /* Warm Truffle */
  --text: #FDFBF7;      /* Vanilla Cream */
  --muted: #B8A99A;     /* Almond Gray */
  --accent: #D4AF37;    /* Edible Gold / Amber Accent */
  --accent-2: #8B4513;  /* Caramel Copper Secondary */
  --line: #423631;      /* Structural Carbon Borders */
}
```

**Typography**
- **Headings & logos:** Space Grotesk — titles, branding, prominent numbers (structural precision).
- **Body text:** Inter — descriptions, parameters, paragraphs (max screen readability).
- **Data & metrics:** JetBrains Mono / Space Mono — ingredient %, baking temps, prices, status.

## 4. AI Media Generation Prompts

Request all media systematically through **Higgsfield MCP** tools. Prompts must strictly
exclude any savory or fast-food references — replace with high-end pastry detail.

### A. Still Images — GPT Image 2

**1. `hero-cake.png`** — Premium cinematic hero for a fictional dark luxury cake app, Basty.
One single flagship custom cake centered as the focal point: rich glossy dark-chocolate glazed
exterior, subtle gold-leaf flakes, geometric artisan chocolate shards, premium crushed roasted
nuts on top. Minimalist premium studio, deep charcoal-cocoa background, warm gold rim lighting,
crisp reflective base, shallow depth of field. No text, no logos, no hands. 16:9, high quality.

**2. `assembly-sponge-vanilla.png`** — Mid-assembly of a Basty flagship cake. Thick, perfectly
porous freshly baked dark-chocolate sponge layer on an artisan surface; on top, a thick layer of
gourmet vanilla-bean cream piped in sharp concentric folds. Dark luxury patisserie style, sharp
textures, warm studio light contrasting dark sponge vs smooth cream. No text, no hands. 16:9, HQ.

**3. `ingredients-chocolate-nuts.png`** — Premium cinematic macro texture. Close-up of melted 85%
dark chocolate flowing over roasted hazelnuts and toasted almond slivers onto a soft cake layer.
Tactile, realistic, rich food-styling light, deep soft shadows, sharp focus on glossy chocolate
reflection. 16:9, high quality.

> Catalog images (`catalog-korean-minimalist`, `catalog-dark-truffle`, `catalog-themed-party`,
> `catalog-classic-wedding`) follow the same dark-luxury pastry styling.

### B. Master Background Video — Seedance 2.0

Core engine of the page — a continuous sequence designed for reverse/forward scroll scrubbing.
File: `copy/video-prompt.md`.

> Cinematic scroll-driven background video for Basty, scrubbed frame-by-frame by scroll progress.
> Motion must be highly stable, continuous, slow, and mechanically smooth.
>
> Sequence:
> 1. Bare, perfectly circular premium chocolate sponge layer centered over a dark reflective
>    surface in a luxury studio.
> 2. Sponge slowly executes a controlled 180° rotation around its central vertical axis.
> 3. As rotation completes, rich vanilla cream filling smoothly pipes onto the top surface.
> 4. Another smooth 180° rotation; during it, a glossy cascade of dark chocolate glaze pours
>    over, seamlessly enrobing the entire exterior.
> 5. The enrobed cake rotates a final time as gourmet crushed nuts and fine gold-dust particles
>    seamlessly attach to the crown, completing the pristine assembly.
>
> Constraints: dark luxury aesthetic, deep cocoa & amber highlights, realistic textures, slow
> steady camera mapping, zero fast cuts, zero sudden shakes, absolute negative space around the
> product for UI overlay. No text, no logos, no human hands, no utensils. 12–16s, 16:9, HQ.

## 5. Scroll-Scrubbed Code Architecture

To scrub frames without lag or audio overhead, process the raw video through `ffmpeg` into an
all-keyframe H.264 stream, then hook it into the GSAP/Lenis loop.

### Video re-encode script — `scripts/swap-bg-video.sh`

```bash
#!/usr/bin/env bash
# File: scripts/swap-bg-video.sh
set -euo pipefail
INPUT="$1"
OUTPUT="website/public/bg.mp4"
mkdir -p website/public
# Force keyframes at every frame (-g 1) for instantaneous seek processing
ffmpeg -y -i "$INPUT" -an -c:v libx264 -preset slow -crf 18 \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart "$OUTPUT"
echo "Successfully compiled all-keyframe background video to $OUTPUT"
```

### React integration & scrub mapping — `website/src/App.jsx`

```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initialize smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.85
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Frame-scrubbing logic mapped to page scroll
    let lastTime = -1;
    const scrubVideo = () => {
      if (!video.duration) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollTop / Math.max(1, scrollHeight)));
      // Prevent final overflow errors by clipping tiny end margins
      const targetTime = progress * (video.duration - 0.06);
      if (Math.abs(targetTime - lastTime) > 0.005) {
        video.currentTime = targetTime;
        lastTime = targetTime;
      }
    };

    video.pause();
    video.currentTime = 0;
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: scrubVideo
    });
    video.addEventListener('loadedmetadata', scrubVideo);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Content layers flow here, scrolling over fixed background */}
    </>
  );
}
```

## 6. UI Layer Stack Architecture

| Selector            | z-index | Operational role                                                       |
|---------------------|---------|------------------------------------------------------------------------|
| `.bg-video` / `#bgv`| 0       | Fixed fullscreen HTML5 video container. Scrubbed continuously.         |
| `.bg-tint`          | 1       | Radial gradient mask ensuring text contrast and vignette tracking.     |
| `.ambient-glow`     | 2       | Subtle orange/gold absolute-positioned radial blurs for lighting.      |
| `#root` / `main`    | 10      | Flowing UI container: textual data, cards, triggers.                   |
| `.floating-panel`   | 20      | Interactive catalog, ordering modules, pricing sheets.                 |

## 7. Verification Checklist

Evaluate before concluding any production cycle:

- [ ] `copy/brand-kit.md` strictly focuses on Basty dessert identity (zero burger/savory leftovers).
- [ ] Visual assets use the deep cocoa (`#1A1412`) and gold (`--accent`) color tokens.
- [ ] `bg.mp4` passes keyframe validation (seek intervals are single-frame responsive).
- [ ] Pinned rotational text containers preserve visibility masks during background rotation frames.
- [ ] Mobile touch fallback activates, using `hero-cake.png` as a static backdrop.
- [ ] Production build compiles with `npm run build -- --base=./`.

## Notes

- Generate media only via Higgsfield MCP tools; never invent savory/fast-food references.
- This skill describes the *workflow and rules only* — it does not itself generate media or scaffold
  the site. Trigger the actual build explicitly when ready.
