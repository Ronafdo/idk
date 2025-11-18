# Romantic Countdown Webpage

This is a single-page experience built with vanilla HTML, CSS, and JavaScript. It features a personalized photo carousel, love note generators, missing-you timer, interactive games, floating hearts, and celebratory confetti. Everything lives in static files, so you can host it anywhere that serves plain HTML.

## Local Preview

Open the main file directly in any browser:

```powershell
Start-Process "Z:\Codebase\Web\b_FmwUb0N8xOx\index.html"
```

## GitHub Pages Deployment

1. **Commit the site files**
   ```powershell
   cd Z:\Codebase\Web\b_FmwUb0N8xOx
   git init
   git add index.html styles.css script.js package.json README.md
   git commit -m "Add romantic webpage"
   ```
2. **Push to your repo** (replace the remote URL if it already exists or needs credentials).
   ```powershell
   git branch -M main
   git remote add origin https://github.com/Ronafdo/idk.git
   git push -u origin main
   ```
3. **Enable Pages**: On GitHub, go to *Settings → Pages*, set Source to `main` and Folder to `/root`, then Save.
4. Wait up to two minutes for GitHub Pages to build, then visit the URL it shows (likely `https://ronafdo.github.io/idk/`).

Once published, reload the public page any time you update `main`—GitHub will redeploy automatically.
