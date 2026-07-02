# Portfolio Website — Design Spec

**Date:** 2026-07-02
**Owner:** Mohammad Adil Sheikh (Adyl-S)
**Status:** Approved by user (hosting, theme, identity, and no-phone decisions confirmed)

## Goal

A publicly accessible, single-page portfolio that positions Adil as a production-grade
AI Engineer (multi-agent systems, voice AI, GTM automation) to recruiters and clients.

## Decisions (user-approved)

- **Hosting:** GitHub Pages at `https://adyl-s.github.io` (repo `Adyl-S.github.io`)
- **Design:** dark futuristic AI theme — navy/black, cyan/violet accents, glass cards,
  particle-network background, terminal motif, scroll-reveal animations
- **Identity:** resume identity — Mohammad Adil Sheikh, AI Engineer, madilsheikh7@gmail.com
- **Privacy:** phone number NOT shown publicly
- **Local location:** `D:\portfolio` (git repo) + Desktop shortcut

## Tech Approach

Pure static HTML/CSS/vanilla JS — no framework, no build step. Rationale: instant loads,
zero dependency maintenance, natively served by GitHub Pages. Rejected alternatives:
Next.js static export and Astro (build tooling with no benefit for a single page).

## Page Structure

1. **Hero** — name, typed role rotation, status badge, CTAs, animated terminal mock
   showing the multi-agent pipeline
2. **Stats bar** — 3+ yrs, 10K+ calls/month, 34 models, <60s proposals, 99% research
   time saved (animated counters)
3. **Featured projects (6)** — ProposalForge*, Multi-Agent Prospect Research, mediaOS,
   Multi-Agent Orchestration Platform*, Voice AI Batch-Calling, AI Avatar Speaking Coach*
   (* = links to public GitHub repo)
4. **Experience timeline** — Eaglytics → Virtual Galaxy → Freelance → HCL
5. **Skills grid** — six groups mirroring the resume, plus GCP cert badges
6. **Contact** — email, GitHub, LinkedIn (linkedin.com/in/mohammad-adil-sheikh-a66855171)

## Non-Functional

- Responsive (mobile nav drawer at ≤720px)
- `prefers-reduced-motion` respected (no particles/typing/counters)
- SEO: meta description, canonical, Open Graph, JSON-LD Person schema
- No external dependencies except Google Fonts

## Files

- `index.html` — content + structure
- `styles.css` — theme
- `script.js` — typing, particles, scroll reveal, counters, nav
