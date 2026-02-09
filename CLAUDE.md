# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 single-page application that visualizes Renaissance Periodization (RP) hypertrophy training volume recommendations by muscle group. Fully static/client-side with no backend API. Deployed to GitHub Pages via `output: 'export'`.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build` (produces `out/`, then `postbuild` copies to `docs/` for GitHub Pages)

## Architecture

### Tech Stack
- Next.js 15 / React 19 / TypeScript 5
- Chart.js 4 via react-chartjs-2 (bar + line chart visualization)
- lucide-react (icons)
- next/font/google (self-hosted Inter font)
- Inline styles + globals.css with CSS custom properties

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          ← Root layout: NavBar, Inter font, metadata, hash redirect script
│   ├── globals.css         ← CSS custom properties + shared button styles
│   ├── page.tsx            ← Home: full 14-row muscle table
│   ├── [muscle]/
│   │   ├── page.tsx        ← Detail: single-row table + chart + exercises (SSG via generateStaticParams)
│   │   └── header.tsx      ← Client component: back arrow + share button
│   └── not-found.tsx       ← 404 page
├── components/
│   ├── nav-bar.tsx         ← Top nav with About dialog trigger (client)
│   ├── muscle-table.tsx    ← HTML <table>, optionally clickable with <Link>
│   ├── volume-chart.tsx    ← Chart.js bar+line chart (client)
│   ├── exercise-list.tsx   ← Exercise links with PlayCircle icons
│   ├── about-dialog.tsx    ← Native <dialog> element (client)
│   ├── share-dialog.tsx    ← Native <dialog> + navigator.clipboard (client)
│   └── disclaimer.tsx      ← Footer disclaimer text
├── data/
│   └── volume-landmarks.ts ← All 14 muscle groups hardcoded data
├── lib/
│   └── chart-utils.ts      ← Chart.js 4 registration + data builder
└── types/
    └── index.ts             ← Exercise + VolumeLandmark interfaces
```

### Data & Routing

- **All muscle group data is hardcoded** in `src/data/volume-landmarks.ts` as the `VOLUME_LANDMARKS` array (14 entries).
- **Routing uses Next.js file-based routing** with dynamic `[muscle]` segment. All 14 muscle pages are pre-rendered at build time via `generateStaticParams()`.
- **Hash redirect:** A small inline script in `layout.tsx` redirects old `/#/Biceps` URLs to `/RP-Hypertrophy-Hub-Visualizer/Biceps/`.

### Data Model
Each muscle group entry has: `Muscle`, `MV` (Maintenance Volume), `MEV` (Minimum Effective Volume), `MAV` (Maximum Adaptive Volume), `MRV` (Maximum Recoverable Volume), `Freq` (frequency), `url` (RP article link), and `exercises` (YouTube links).

### Build Output
Production builds produce `out/` (Next.js static export), then `postbuild` copies to `docs/` for GitHub Pages. The `basePath` in `next.config.ts` is set to `/RP-Hypertrophy-Hub-Visualizer`.
