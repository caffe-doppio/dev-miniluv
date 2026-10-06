# Miniluv Citizen Services

Fictional citizen portal for the "Borrowed from the Lab" hands-on. Synthetic data only.

Spec, personas and scenario answers: [`specs/SPEC-miniluv_v01.md`](specs/SPEC-miniluv_v01.md) (facilitator team only).

## Run

Docker (same image as the server):

```sh
cd dev/miniluv/site
docker compose up --build -d     # http://localhost:8080
docker compose down
```

Without Docker (Node 24):

```sh
cd dev/miniluv/site
npm ci
npm run build
npm start                        # http://localhost:8080
```

Offline fallback, no Node at all, from an already built `dist/`:

```sh
cd dev/miniluv/site/dist
python3 -m http.server 8000      # http://localhost:8000
```

The fallback has no `Set-Cookie` and no CSP header (the CSP meta tag still applies).

## Edit

- Display rules (S1, S2): `site/src/rules.ts`. Participants read this file in DevTools > Sources.
- API answers: `site/public/api/v1/`, static JSON, copied as is into `dist/`.
- Headers and session cookie: `site/server.ts`.
- `npm run dev` starts Vite on http://localhost:5173 with hot reload (no CSP, no cookie).

## Quick entry points

| Persona | URL |
|---------|-----|
| Demo (facilitator) | `/#/citizen/ML-0000-D` |
| P1, S1 | `/#/citizen/ML-0417-K` |
| P2, S2 | `/#/citizen/ML-0582-R/appointments` |
| P3, S1 + S2 | `/#/citizen/ML-0733-V` |
| P4, control | `/#/citizen/ML-0901-B` |
