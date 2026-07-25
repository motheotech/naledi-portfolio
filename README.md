# naledi-portfolio

Personal portfolio site — React 18 + Vite 5 + Tailwind CSS 3, deployed to GitHub Pages.

## Requirements

- Node.js 20 or newer (`node -v` to check)
- Git, and a GitHub account

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Edits to `src/NalediPortfolio.jsx` hot-reload in the browser.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before deploying |
| `npm run deploy` | Build, then push `dist/` to the `gh-pages` branch |

## Deploy to GitHub Pages

The repo name has to match `REPO_NAME` in `vite.config.js`, because a GitHub project
site is served from `https://<username>.github.io/<repo>/` and the build needs that
sub-path baked into its asset URLs. Default is `naledi-portfolio`.

1. Create an empty repo on GitHub named `naledi-portfolio` (no README, no .gitignore).
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/naledi-portfolio.git
   git push -u origin main
   ```

3. Publish:

   ```bash
   npm run deploy
   ```

4. On GitHub: **Settings → Pages → Build and deployment**, set Source to
   "Deploy from a branch", branch `gh-pages`, folder `/ (root)`. Save.

The site appears at `https://<username>.github.io/naledi-portfolio/` within a minute
or two. Re-run `npm run deploy` after any change.

### Alternative: deploy automatically on push

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. To use it
instead of the manual command, go to **Settings → Pages** and set Source to
"GitHub Actions". Then plain `git push` is all that's needed.

## Project layout

```
index.html               entry HTML, page title and meta description
src/main.jsx             mounts the React app
src/index.css            Tailwind directives + reduced-motion handling
src/NalediPortfolio.jsx  the whole app (shell, sections, triage simulator, admin console)
vite.config.js           build config, incl. the GitHub Pages base path
tailwind.config.js       Tailwind content paths
```

## Custom domain later

Set `base: '/'` in `vite.config.js`, add a `public/CNAME` file containing the domain,
then configure the domain under Settings → Pages.
