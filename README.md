# Kuna's Unblocked Games

A modern, customizable unblocked games portal with curated HTML5 and iframe-powered games, custom theme picker, JSON game management, and tab cloak features.

---

## 🚀 How to Fix GitHub Pages White Screen / 404 Error

If you push raw source code to GitHub and directly enable GitHub Pages on the `main` root folder, GitHub Pages serves the uncompiled `index.html` (which points to `src/main.jsx`). Browsers cannot run uncompiled JSX directly or locate development modules, resulting in:
```text
src/main.jsx:1 Failed to load resource: the server responded with a status of 404
```

## 🚀 How to Fix GitHub Pages White Screen & MIME Errors

When you deploy a Vite/React application to GitHub Pages, the raw `.jsx` source files cannot run directly in a browser. Standard static web servers serve `.jsx` with MIME type `text/jsx`, which browsers reject with:
```text
main.jsx:1 Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/jsx". Strict MIME type checking is enforced for module scripts per HTML spec.
```

We have already configured this repository so it works with **any** deployment method:

### 🌟 Method 1: Point GitHub Pages to `/docs` (Easiest & Instant)
The pre-compiled production build is stored directly in the **`docs/`** folder of this repository.

1. On GitHub, navigate to your repository.
2. Click **Settings** (top tab) → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`)
   - **Folder**: select **`/docs`** (instead of `/ (root)`)
4. Click **Save**.
Your site will be live immediately with zero build wait time!

---

### 🌟 Method 2: Use GitHub Actions (Automatic Build & Deploy)
The repository includes an automated workflow in `.github/workflows/deploy.yml` that automatically compiles and deploys on every push.

1. On GitHub, navigate to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **`GitHub Actions`**.
3. Under the **Actions** tab on GitHub, you can watch the build run automatically and provide the live URL.

---

### 🌟 Method 3: Deploy via Terminal (`npm run deploy`)
1. In your local terminal, run:
   ```bash
   npm run deploy
   ```
2. In GitHub **Settings** → **Pages**, select branch **`gh-pages`** and folder **`/ (root)`**.
