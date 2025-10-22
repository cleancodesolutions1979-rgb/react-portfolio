# React Portfolio — Local development

Quick notes to run and verify the project locally.

Prerequisites

- Node.js (16+ recommended) and npm installed.

Install

```bash
npm install
```

Start dev server

```bash
npm run dev
# open http://localhost:5173
```

Build

```bash
npm run build
npm run preview
```

Git

- This workspace currently has no git repo. To create commits locally:

```bash
git init
git add -A
git commit -m "Polish: layout, accessibility, responsive images, tailwind editor settings"
```

If you want, I can prepare a clean set of commits and a suggested PR description — tell me and I'll prepare the diffs.

# React + Vite + Tailwind (minimal)

This is a minimal Vite + React project with Tailwind CSS configured.

## Quick start

```bash
npm install
npm run dev
# open the URL printed by Vite (e.g. http://localhost:5175)
```

## What to check

- The app should render `Vite + React` and a heading that says `Tailwind is working`.
- There's a small test card in the page that uses Tailwind utilities (colors, padding, rounded corners). If that card looks styled, Tailwind is working.

## Notes

- If port 5173 is occupied, Vite will auto-pick another port (5174, 5175, ...). You can start on a specific port with:

```bash
npm run dev -- --port 5173
```

- If you need to free a port, list and kill processes listening on it (zsh):

```bash
lsof -i tcp:5173 -sTCP:LISTEN -P -n
for pid in $(lsof -ti tcp:5173); do kill "$pid"; done
```

Note: If Tailwind utilities don't appear during local development you can temporarily enable the CDN by including the following in `index.html` (already added in this project as a dev-only fallback):

```html
<script src="https://cdn.tailwindcss.com"></script>
```

This is a development convenience only — for production builds prefer the PostCSS/Tailwind pipeline already configured in this repository.
