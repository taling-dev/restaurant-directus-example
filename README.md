# Directus + Svelte Restaurant Site

Restaurant website built with SvelteKit and prepared for Directus-managed content. The repo is now set up to run well on Coolify with:

- a SvelteKit Node server built from this repo
- a Directus service using the official Docker image
- a PostgreSQL database service

## Stack

- SvelteKit + TypeScript
- Tailwind CSS v4
- Directus + PostgreSQL via Docker Compose locally or Coolify in production
- Server-side data loading with demo-content fallback

## Features

- Home, menu, promos, about, contact, and gallery pages
- Directus-aware content loaders for site settings, sections, menu items, promos, hours, and gallery content
- Mobile-first restaurant layout with reservation, call, and directions CTAs
- Local SEO structure, metadata, and structured footer/contact content
- Directus bootstrap script for the initial collections and fields

## Local Setup

1. Copy the environment file:

```sh
cp .env.example .env
```

2. Start Directus and PostgreSQL:

```sh
npm run cms:up
```

3. Bootstrap the Directus schema:

```sh
npm run directus:bootstrap
```

To also insert demo records:

```sh
npm run directus:bootstrap -- --seed
```

4. Start the frontend:

```sh
npm run dev
```

## Coolify Deployment

Recommended production shape in Coolify:

1. Create a PostgreSQL resource in Coolify.
2. Create a Directus service in Coolify from the image `directus/directus:11.10.2`.
3. Create a frontend service in Coolify from this repo using the included `Dockerfile`.

### Frontend Service

Coolify settings:

- Build pack: `Dockerfile`
- Port: `3000`
- Health check path: `/health`

Frontend environment variables:

- `NODE_ENV=production`
- `HOST=0.0.0.0`
- `PORT=3000`
- `ORIGIN=https://www.your-domain.com`
- `PUBLIC_SITE_URL=https://www.your-domain.com`
- `PUBLIC_DIRECTUS_URL=https://cms.your-domain.com`
- `DIRECTUS_TOKEN=` optional if using a public read role in Directus

### Directus Service

Use the Docker image `directus/directus:11.10.2` and expose port `8055`.

Attach persistent storage to:

- `/directus/uploads`
- `/directus/extensions`

Directus environment variables:

- `KEY`
- `SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `DB_CLIENT=pg`
- `DB_HOST=<Coolify postgres host>`
- `DB_PORT=<Coolify postgres port>`
- `DB_DATABASE=<Coolify postgres database>`
- `DB_USER=<Coolify postgres user>`
- `DB_PASSWORD=<Coolify postgres password>`
- `WEBSOCKETS_ENABLED=true`
- `CORS_ENABLED=true`
- `CORS_ORIGIN=https://www.your-domain.com`
- `PUBLIC_URL=https://cms.your-domain.com`

### Bootstrap Directus

After Directus is live, run the schema bootstrap once from a shell with network access to the Directus URL:

```sh
npm run directus:bootstrap
```

To also seed demo records:

```sh
npm run directus:bootstrap -- --seed
```

That script requires:

- `PUBLIC_DIRECTUS_URL`
- one of:
  - `DIRECTUS_ADMIN_TOKEN`
  - `DIRECTUS_ADMIN_EMAIL` and `DIRECTUS_ADMIN_PASSWORD`

If bootstrap returns `403 FORBIDDEN` on `/collections` or `/fields`, authentication worked but the identity does not have schema-write permission. In that case, use a real Directus administrator account or a full-access admin token for `DIRECTUS_ADMIN_TOKEN`.

If collection creation succeeds but field creation immediately fails with `collection does not exist` or `403` on `/fields/<collection>`, the cause is usually Directus schema cache state. The bootstrap script now clears internal cache automatically, but if your Directus deployment is scaled to multiple instances you should keep it at one replica during bootstrap or use shared cache infrastructure instead of per-instance memory cache.

### Recommended Domains

- `www.your-domain.com` -> frontend service
- `cms.your-domain.com` -> Directus service

### After First Deploy

- Create or verify the Directus `Public` role can read the public restaurant collections.
- If you do not want public read access, create a token and set `DIRECTUS_TOKEN` on the frontend service.
- Replace demo content with production content in Directus.

## Directus Connection

The app reads from Directus when `PUBLIC_DIRECTUS_URL` is configured. If Directus is unavailable or empty, the UI falls back to curated demo content so the site stays runnable during setup.

Recommended environment variables:

- `PUBLIC_SITE_URL`
- `PUBLIC_DIRECTUS_URL`
- `DIRECTUS_TOKEN`
- `DIRECTUS_ADMIN_TOKEN`
- `HOST`
- `PORT`
- `ORIGIN`
- `DIRECTUS_ADMIN_EMAIL`
- `DIRECTUS_ADMIN_PASSWORD`
- `DIRECTUS_KEY`
- `DIRECTUS_SECRET`
- `DIRECTUS_CORS_ORIGIN`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

## Quality Checks

```sh
npm run check
npm run test
npm run build
```

## Deployment Notes

- The frontend now uses `@sveltejs/adapter-node` so it can run cleanly inside Coolify as a Node container.
- Use a hosted Directus instance, a Coolify Directus service, or the included Docker stack locally.
- Keep the frontend and Directus URLs aligned with the production environment variables.
- Use persistent storage for Directus uploads in production.
