# Our Little World

A React + Vite starter for Aleyna and Orion's interactive anniversary phone experience.

## Run locally

1. Install Node.js (LTS).
2. Extract this project and open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Demo passcode

The starter uses `1902` as a temporary example. Replace it in `src/App.jsx` with a meaningful number before sharing. This is a front-end interaction only, not real content security.

## Current scaffold

- Responsive phone frame on desktop; full-screen experience on mobile.
- Lock screen, passcode keypad, home screen, and app navigation.
- Placeholder Gallery, Calendar, Music, Notes, and Mystery app.
- Simple clue progress stored in localStorage.
- Gallery demo clip and final-gift video are placeholders; add your own files under `public/media/` and update `src/data.js`.

## Personalization next

1. Replace demo photos in `src/data.js`.
2. Add `public/media/anniversary-preview.mp4` and `public/media/anniversary-full.mp4`.
3. Add audio files under `public/media/music/` and update `src/data.js`.
4. Replace sample dates and notes with real memories.
5. Design the cross-app clue sequence and final letter.

## Privacy note

Anyone with the deployed link can access the website. The passcode in this starter is only a playful unlock screen; it does not secure public assets or source code. Do not upload private material unless you are comfortable with it being accessible to link holders.
