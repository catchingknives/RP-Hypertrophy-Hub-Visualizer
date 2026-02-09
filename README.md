# RP Hypertrophy Hub Visualizer

A static web app that visualizes [Renaissance Periodization](https://rpstrength.com/) (RP) hypertrophy training volume recommendations by muscle group. Click a muscle group to see its volume landmarks (MV, MEV, MAV, MRV), a bar chart of the progression, recommended frequency, and suggested exercises with video links.

**Live site:** [catchingknives.github.io/RP-Hypertrophy-Hub-Visualizer](https://catchingknives.github.io/RP-Hypertrophy-Hub-Visualizer/)

If you're not familiar with the volume landmarks concept, read the [RP training volume landmarks article](https://rpstrength.com/blogs/articles/training-volume-landmarks-muscle-growth) first.

## Original Author

This project was originally created by **Ryan Lefebvre** as an Angular 8 application. Ryan has since removed his original repository. This fork preserves his work and the RP volume data he compiled, modernized with a current tech stack.

All training volume data and exercise recommendations come from [Renaissance Periodization's Hypertrophy Training Guide Central Hub](https://rpstrength.com/blogs/articles/hypertrophy-training-guide-central-hub). This project is not affiliated with RP.

## Modernization (Angular 8 → Next.js 15)

The original app ran on Angular 8 (end-of-life since November 2019) and required `--openssl-legacy-provider` to build on modern Node.js. It has been fully rewritten in Next.js 15 while preserving all original functionality and data.

| | Original | Modernized |
|---|---|---|
| **Framework** | Angular 8.2 / TypeScript 3.5 | Next.js 15 / React 19 / TypeScript 5 |
| **Charts** | Chart.js 2.9 + ng2-charts | Chart.js 4 + react-chartjs-2 |
| **Dialogs** | Angular Material | Native `<dialog>` element |
| **Icons** | Material Icons (CDN) | lucide-react (tree-shaken) |
| **Fonts** | Google Fonts CDN | next/font/google (self-hosted) |
| **Routing** | Manual hash-based (`/#/Biceps`) | File-based (`/Biceps/`) |
| **Build** | `--openssl-legacy-provider` required | Works natively on Node 22+ |
| **Prod deps** | 11 packages | 6 packages |

Old hash-based URLs (`/#/Biceps`) are automatically redirected to the new paths for backwards compatibility.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (outputs to docs/ for GitHub Pages)
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            Root layout, nav bar, font loading
│   ├── page.tsx              Home page with full muscle group table
│   ├── [muscle]/page.tsx     Detail page with chart + exercises (14 pages, pre-rendered)
│   └── not-found.tsx         404 page
├── components/               React components (table, chart, dialogs, etc.)
├── data/volume-landmarks.ts  All 14 muscle groups with volume data and exercises
├── lib/chart-utils.ts        Chart.js 4 configuration and data builder
└── types/index.ts            TypeScript interfaces
```

## License

The original project did not include a license. The training data and recommendations belong to Renaissance Periodization.
