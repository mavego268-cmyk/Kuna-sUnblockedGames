# Kuna's Unblocked Games

A modern, customizable unblocked games portal with curated HTML5 and iframe-powered games, custom theme picker, JSON game management, and tab cloak features.

---

## 🚀 How to Fix GitHub Pages White Screen / 404 Error

If you push raw source code to GitHub and directly enable GitHub Pages on the `main` root folder, GitHub Pages serves the uncompiled `index.html` (which points to `src/main.jsx`). Browsers cannot run uncompiled JSX directly or locate development modules, resulting in:
```text
src/main.jsx:1 Failed to load resource: the server responded with a status of 404
```

### ⭐️ Recommended Solution: Use GitHub Actions (Automatic Build)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically runs `npm run build` and deploys the compiled output (`dist/`) directly to GitHub Pages.

#### 2-Step Setup on GitHub:
1. Push your repository code to GitHub.
2. On GitHub, go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select **`GitHub Actions`** (instead of *"Deploy from a branch"*).

That's it! Every time you push changes, GitHub will automatically compile the React app and deploy it live without 404s.

---

### 🛠️ Alternative Solution: Manual Build to `gh-pages` or `dist/`

If you prefer deploying with `"Deploy from a branch"`:

1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Deploy the contents of the generated **`dist/`** folder (NOT the root source directory) to the `gh-pages` branch or configure GitHub Pages to point to the `/dist` directory.
