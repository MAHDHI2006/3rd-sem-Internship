<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot Instructions for this repository

Purpose: Help an AI agent get productive quickly across this multi-project workspace.

Repository layout (big picture)
- Multiple small Vite + React projects live at the repository root as folders: `SampleExample`, `MERN project`, and `Day6 work`.
- Each project is a self-contained Vite app with its own `package.json` and `vite.config.js`.
- There are also standalone HTML/JS files at the repo root used for unrelated experiments.

Key workflows (how to build/run/lint)
- To work on a specific project, change into its folder. Example for `SampleExample`:

  cd SampleExample
  npm install
  npm run dev

- Common npm scripts (present in each project `package.json`): `dev` (vite), `build` (vite build), `lint` (eslint .), `preview`.

Project-specific conventions and patterns
- React + Vite with the `@vitejs/plugin-react-swc` compiler is used. Expect modern ESM + JSX and React 19.
- Components are organized under `src/components`. This repo uses `functionalComponents` subfolders (example: `src/components/functionalComponents/Navbar.jsx`).
- Components use default exports and simple functional components. When adding a component, place it under the appropriate `components/` folder and import it from `App.jsx` or `main.jsx`.
- Styles live under `src/css` and per-project `css/` directories. Assets live under `src/assets`.

Integration points and external deps
- The `MERN project` adds `react-router-dom` as a dependency; routing-related components will be under its `src/` tree.
- No server/backend code is present in the repository root — the projects are frontend-only; treat backend integration as external.

Linting and formatting
- ESLint configs are present in project roots (e.g., `Day6 work/eslint.config.js`, `MERN project/eslint.config.js`). Use the `npm run lint` script in the target project before committing code.

Files to inspect when you need context
- App entry points: `SampleExample/src/main.jsx` and `SampleExample/src/App.jsx`.
- Example component to edit: `SampleExample/src/components/functionalComponents/Navbar.jsx`.
- Vite config: `SampleExample/vite.config.js` (and same-named files in other projects).

Examples of tasks and where to start
- Add a new component to `SampleExample`: create `src/components/functionalComponents/MyWidget.jsx`, import and register it in `App.jsx`, run `npm run dev` to verify HMR.
- Fix lint errors: run `npm run lint` from the project folder and follow existing ESLint rules in the project's `eslint.config.js`.

Notes and limitations (discoverable from the repo)
- There are no automated tests or CI configs detected — do not assume test runners exist.
- Multiple independent Vite projects mean changes to one project should not assume changes will be applied globally.

When in doubt
- Run the local `dev` script in the relevant project folder to reproduce the developer experience.
- Read the project's `package.json`, `vite.config.js`, and `eslint.config.js` for concrete rules and scripts.

Please review and tell me which project you'd like me to focus on next or if you want stricter lint/format rules added.
