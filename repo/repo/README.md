# Fathima Hisana Nissar, Portfolio

Personal portfolio built with plain HTML, CSS and JavaScript. There is no build step and no dependencies, so it runs anywhere and deploys straight to GitHub Pages.

Features: light and dark themes (saved, follows your system on first visit), a command interface (`Ctrl/Cmd + K`), a signature "signal breach" glitch effect (hover, click or press Enter on the portrait), and small interactive demos inside each project.

## Structure

```
index.html        page markup
css/styles.css    design tokens, both themes, layout, glitch effects
js/data.js        all editable content (projects, skills, experience, links)
js/main.js        rendering, theme, terminal, glitch, project demos
assets/portrait.webp
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a new repository on GitHub and upload these files, or from this folder run:
   ```
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In the repository go to Settings, then Pages.
3. Under Build and deployment, choose "Deploy from a branch", select `main` and `/ (root)`, and save.
4. Your site appears at `https://<your-username>.github.io/<repo-name>/` after a minute or two. Name the repository `<your-username>.github.io` to get the shorter address.

## Editing content

Everything you will want to change is in `js/data.js`:

- `projects`: name, status, description, tech, detail bullets, and `links` (add `{label:"GitHub",url:"https://..."}` entries when repositories are public).
- `exp`: experience entries. The NPOL entry has no description beyond ML and PCA yet.
- `skills`, `nums`, `lead`, `contact`.

To change the portrait, replace `assets/portrait.webp` (4:5 crop works best).

## Notes

- The project demos (rumor network, scheduler, SafeShift alerts, headline checker) are simulated examples. The AABS peak window and SafeShift thresholds are illustrative, not the real values.
- Fonts load from Google Fonts, with system fallbacks if they are unavailable.
- Respects `prefers-reduced-motion`: the glitch animations are replaced by a brief static colour split.
