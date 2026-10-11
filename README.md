# Tabungan FM PWA

PWA shell for the existing Google Apps Script web app. The app is loaded in a full-screen iframe, so its existing `google.script.run` calls continue to run inside the Apps Script page. This avoids moving the backend or rewriting its server calls for browser CORS.

## Apps Script endpoint

The deployment URL is configured in `app-config.js`:

`https://script.google.com/macros/s/AKfycbxeMjo1lIqCPK8QmyUGjm8_StaVj1a7DMvBf20H0gjFNwFbDRs8k84A8ga2kNDBd62e/exec`

The Apps Script `doGet` response must allow framing. The current project sets `XFrameOptionsMode.ALLOWALL`.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main**, folder **/(root)**, then save.
4. Wait for GitHub Pages to publish, then open `https://appfathanmubina.github.io/fm-tabungan/`.
5. Install the PWA from the browser's install option or use **Add to Home Screen** on mobile.

GitHub Pages serves the installable shell over HTTPS. The service worker caches that shell for offline startup. The Apps Script application itself still requires an internet connection and is loaded from Google at runtime.

## Updating the Apps Script URL

Change `TABUNGAN_APP_SCRIPT_URL` in `app-config.js` when deploying a new Apps Script web app version. Keep the URL ending in `/exec` for the deployed version.

## Files

- `index.html`: PWA shell and Apps Script frame
- `manifest.webmanifest`: install name, launch path, display mode, and app icons
- `service-worker.js`: shell caching and offline fallback
- `app-config.js`: deployed Apps Script URL

This repository contains only the PWA shell. Apps Script backend source and spreadsheet credentials are intentionally not copied into this public repository.
