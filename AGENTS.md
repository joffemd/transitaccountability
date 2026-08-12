# AGENTS.md — Repository Guidance for AI Assistants

## Project Overview
This repository contains the source code for [transitaccountability.com](https://transitaccountability.com), a static website built with plain HTML, Vanilla CSS and JavaScript, hosted on GitHub Pages.

## Project Structure
- `*.html` — Page markup (`index.html`, `better-way.html`, `regressive-tax.html`, etc.)
- `styles.css` — Core design system and styles
- `site.js` — Consolidated site script (mobile navigation menu + homepage tax calculator & volunteer form)
- `art/` — SVG graphic assets and illustrations
- `.github/workflows/deploy.yml` — GitHub Actions workflow for static site build and deployment

## Build & Local Testing
- **Package Manager**: `pnpm`
- **Runtime**: Node.js 24

### 1. Preview Production Build Locally
To compile minified assets, stage the production `dist/` package and preview it locally:
```bash
pnpm run preview
```
Open `http://localhost:8000` in any web browser to test the exact minified output served by production.

### 2. Build & Minification Script
To verify CSS and JS compilation locally:
```bash
pnpm run build
```
- Minifies `styles.css` -> `styles.min.css` (via `clean-css-cli`)
- Minifies `site.js` -> `site.min.js` (via `esbuild`)

## Development Rules
1. **Do Not Edit Minified Files Directly**: Always edit `styles.css` or `site.js`. Build artifacts (`styles.min.css`, `site.min.js`) are generated automatically by CI and ignored by Git.
2. **Legal & Compliance**: Preserve all required campaign FPPC disclosures in page footers.
3. **Single Script Pattern**: All JavaScript logic is maintained in `site.js`. Do not re-add inline `<script>` logic to HTML pages.
4. **Grammar & Style**: Never use Oxford commas in content or commit messages.
5. **Git Push**: Never run `git push` without explicit permission from the user.
6. **Commit Messages**: Commit messages must summarize the final state of changes logically from a maintainer's perspective. Never reference intermediary chat history, agent corrections or conversational context (e.g. "fixed text after user asked to remove it").
