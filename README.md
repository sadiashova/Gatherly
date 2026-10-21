# Gatherly

Gatherly is a responsive neighborhood-gathering discovery app built with the Next.js App Router. It includes public discovery pages, gathering details, an about page, and signed-in-only gathering management screens.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — landing page
- `/about` — about Gatherly
- `/items` — searchable gatherings with category and price filters
- `/items/[id]` — gathering details
- `/items/add` — protected add-gathering form
- `/items/manage` — protected gathering list with view and delete actions
- `/login` and `/register` — integration placeholders for Firebase authentication

The landing page contains a hero, three feature highlights, a gathering preview, a testimonial, and a final call to action. The navbar and footer are shared by the root layout.

## Firebase authentication handoff

Firebase configuration and the existing `AuthProvider` are retained in `src/lib/firebase.js` and `src/components/auth/AuthProvider.js`. Authentication form submission is intentionally left to be completed by the project owner. Add Firebase email/password and optional Google sign-in forms to `/login` and `/register`; the protected routes already use the existing auth context and redirect signed-out visitors to `/login`.

Set the following public environment variables in `.env.local` for the existing Firebase client setup:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Demo data

The catalog starts with eight sample gatherings in `src/lib/items.js`. New gatherings and removals are stored in the browser's local storage, so demo changes are local to the current browser and are not synced across users or devices. Replace this storage layer with a persistent data source when the app is ready for production,

## Checks

```bash
npm run lint
npm run build
```
