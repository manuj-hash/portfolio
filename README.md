# Manuj U. — Immersive 3D Portfolio

A full React + TypeScript + Vite portfolio with a custom Three.js / React Three Fiber point-cloud portrait.

## Run locally
1. Install Node.js 18 or newer.
2. Open this folder in VS Code / PowerShell.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the Vite local URL (normally http://localhost:5173).

## Personal assets
- `public/portrait.webp` is the supplied primary portrait. The browser samples it into an interactive particle point-cloud.
- Add your final resume PDF as `public/resume.pdf`; the download button expects this path.
- Replace `your-email@example.com` in `src/App.tsx` with your preferred public email.

## Particle interaction
A custom WebGL vertex shader pushes particles away from the pointer, adds subtle depth motion and lets the points settle back into the portrait. Pointer position also creates a restrained 3D tilt. Image sampling filters most of the pale wall to emphasize the face and shoulders. Reduced-motion preferences disable idle movement and tilt.

Project details and achievements are intentionally conservative. Add verified live demos and additional project details when ready.
