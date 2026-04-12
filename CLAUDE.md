# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev          # Start dev server on port 4000
pnpm test             # Run all tests (Jest, e2e + unit)
pnpm run jest         # Run Jest directly (--forceExit --detectOpenHandles)
pnpm run update-snaps # Update Jest snapshots
pnpm run generate-gql-types  # Regenerate TypeScript types from schema (codegen.yml → gql-types.d.ts)
```

Run a single test file:
```bash
npx jest api/__tests__/families.e2e.js --forceExit
```

## Architecture

This is a **GraphQL API for European dragonflies and damselflies (Odonata)**, built with Apollo Server 5 and deployed as Vercel serverless functions.

### Entry Points

- `api/index.js` — Vercel/production entry (uses `@as-integrations/next`)
- `api/dev-server.js` — Standalone local dev server on `:4000`

### Request Flow

```
Client → Auth middleware (api/_middleware/auth.js)
       → Context creation (api/_context.js) — initializes SpeciesAPI + AboutAPI
       → Resolver (api/_resolvers.js)
       → Data store API (api/_dataStores/)
       → Static JSON data (api/_data/)
```

### Data Layer

All data is **static JSON** — no database. The store is initialized at request time via `api/_utils/createStore.js`:

- `createSpeciesStore()` loads 12 family JSON files from `api/_data/` and produces:
  - `species` — hierarchical tree (Family → Genus → Species)
  - `allSpecies` — flat array
  - `allFamilies` / `allGenera` — extracted name lists
- `createAboutStore()` loads `api/_data/families.js` and `api/_data/genera.js` for metadata (descriptions, citations)

### Schema & Resolvers

- `api/_schema.js` — GraphQL type definitions
- `api/_resolvers.js` — 11 Query resolvers: `families`, `genera`, `species`, `specieFromId`, `specieFromScientificName`, `familySpecies`, `familyGenera`, `genusSpecies`, `aboutGenus`, `aboutFamily`, `taxonomy`
- `api/_dataStores/SpeciesAPI.js` — species/family/genus queries
- `api/_dataStores/AboutAPI.js` — taxonomy metadata queries

### Authentication

Strict API key validation — all queries require a key. Accepted via:
1. Header: `X-API-Key: <key>`
2. Query param: `?apiKey=<key>`
3. GraphQL variables: `{"variables": {"apiKey": "<key>"}}`

Keys are set in the `VALID_API_KEYS` environment variable (comma-separated). See `.env.example`.

### Code Style

Prettier is configured (`.prettierrc.js`): 2-space indent, single quotes, no semicolons, no trailing commas. Husky runs pre-commit hooks.
