# Max Measure Estimators AI Support Demo

Static replica of https://www.mmestimators.com/ (all 10 pages, local assets) with a
Vapi click-to-call button and a chatQuartz chat widget on the home page.

## Pages
Home, Services, About, FAQ, Contact, Blog (+2 posts), Delaware and Tennessee service pages.

## Demo-only changes from the live site
- `noindex` added and canonical links removed.
- Cloudflare email obfuscation replaced with plain `mailto:` links.
- The contact form does **not** submit anywhere (the live form posts to the client's inbox).

## Configuration
- **Voice agent:** set `ASSISTANT_ID` in `assets/demo.js` (`PUBLIC_KEY` is the account-level Vapi public key). Until set, the Click to Call button is disabled.
- **Chatbot:** in `index.html`, replace `YOUR_CHATQUARTZ_ACCOUNT_ID` and uncomment the script tag at the bottom.

## Local development
`npx serve .` then open http://localhost:3000

## Deploy
Vercel, static files, no build step.

## Access gate
`middleware.js` is Vercel Edge Middleware that runs before any file is served. Session is a stateless
HMAC token in an `HttpOnly; Secure` cookie (`mmestimators_session`, one week). Credentials come only from
environment variables (no defaults, fails closed with a 503): `AUTH_USER`, `AUTH_PASSWORD`, `AUTH_SECRET`.
Public paths: `/login`, `/login.html`, `/assets/logo-480.png`, favicons.
