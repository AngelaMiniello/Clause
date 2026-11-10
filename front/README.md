# Clause frontend

Angular application with standalone components, Signals and Angular Router.

## Run

- `npm install`
- `npm run dev` — http://localhost:4200
- `npm run build` — production output in `dist/clause/browser`
- `npm run typecheck` — TypeScript and Angular template validation

Requires Node.js 22.12+ within Node 22, or another version supported by Angular 21.

## Structure

- `src/app/navbar.*`: responsive navigation and dropdowns.
- `src/app/app.routes.ts`: navigation routes.
- `src/app/page.ts`: home and temporary section placeholders.
- `src/styles.css`: shared styles.
- `public/clause-logo.png`: original Clause logo.

The section routes are placeholders. Search preserves the query in the URL but is not connected to a catalog. Authentication and backend integration are pending. The navbar accepts an optional `avatarUrl` input.

The existing `back/` project is separate and unchanged. Angular does not automatically load Next.js `.env.local` files; configure API access explicitly when integrating the backend. Never place server secrets in browser configuration.

Production hosting must serve `index.html` for application routes (SPA fallback).
