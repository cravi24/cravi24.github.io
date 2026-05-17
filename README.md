# Personal portfolio

Personal portfolio + interactive resume builder with multiple templates, light/dark theme, print/PDF-ready output.

**Live:** [cravi24.github.io](http://cravi24.github.io)

## Features

- **Editable resume** — fill in personal info, summary, experience (with nested achievements), skills, education; persisted to `localStorage` (`resume-builder.user-data.v1`).
- **Empty-state fallback** — preview always renders. Fields you haven't filled fall through to dummy data; sections show a `dummy` badge in the editor.
- **Light / dark theme** — toggle in header. Honors `prefers-color-scheme` on first visit, persists to `localStorage`.
- **Print/PDF-ready**


## Tech

- React 19.2 · Vite 7 · react-router-dom 7
- Sass (modern `@use`/`@forward` namespacing)
- CSS variables for theming
- No backend — pure client-side, deploys as static files

## Getting started

Requires Node ≥ 18. Project pins Node 24 via `.nvmrc`.

```bash
nvm use         # picks Node 24 if you use nvm
npm install
npm run dev
```

Open [http://localhost:5173/resume-builder/](http://localhost:5173/resume-builder/).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run deploy` | Build + push `dist/` to `gh-pages` branch |

## Project structure

```
src/
├── components/
│   ├── App/             # router shell
│   ├── Header/          # nav + theme toggle
│   ├── Footer/
│   ├── Gear/            # SVG gear with CSS-rotation
│   ├── ResumeEditor/    # accordion-style editor with reorder/duplicate
│   ├── TemplatePicker/  # custom dropdown (no native select)
│   ├── ThemeToggle/
│   └── SocialIcons/     # inline SVG icons + URL/handle helpers
├── pages/
│   ├── Home/            # EM portfolio + clockwork hero
│   ├── ResumeBuilder/   # split-view: editor left, preview right
│   ├── AboutMe/
│   ├── TechBlogsPage/
│   └── PersonalBlogs/
├── templates/
│   ├── Modern/          # single-column, teal accent
│   ├── Traditional/     # two-column serif sidebar
│   ├── BerlinModern/    # Notion/Linear minimal
│   └── BerlinStartup/   # bold gradient hero
├── data/
│   └── dummyResume.em.js  # default content shown when fields are empty
├── hooks/
│   ├── useResume.js     # state + localStorage + merge-with-dummy
│   └── useTheme.js      # dark/light state + persistence
└── styling/
    ├── colors.scss
    └── media-queries.scss
```

## Theme system

CSS variables on `:root` (dark default) and `:root[data-theme='light']`:

```css
:root {
  --bg-page: #0a0e1a;
  --text-primary: #f0ead6;
  --accent: #c89b3c;
  /* ... */
}
```

Toggling sets the `data-theme` attribute on `<html>`. Templates intentionally stay on a white background regardless of theme to preserve print quality.

## Deploy

`npm run deploy` does:
1. `npm run build` → builds into `dist/`.
2. `gh-pages -d dist` → force-pushes `dist/` to the `gh-pages` branch.

GitHub Pages serves from that branch at the URL in `package.json`'s `homepage` field.

## Notes

- `node_modules` and `dist/` are gitignored.
- `.claude/settings.local.json` is gitignored (for personal/local Claude Code config overrides).
- The Claude Code learning guide at `CLAUDE_LEARNING_GUIDE.md` is gitignored — it's a local document, not part of the published project.
