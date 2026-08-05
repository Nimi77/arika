# Arika

Arika is a lightweight AI customer-support web app for African small businesses. The product is designed to help merchants answer customer questions faster, recover lost sales, and keep conversations organized across the channels they already use.

## What the project is about

Arika helps business owners reduce manual customer messaging and response delays by presenting a polished, single-dashboard experience for customer conversations. The landing page is meant to explain the product clearly, show the value proposition, and direct users into the auth flow.

## Key things to know

- This project is built with Next.js and the App Router.
- Static brand assets, icons, and images live in the public folder.
- The homepage uses reusable section content from the home content file.
- Auth pages are available under `/auth/login` and `/auth/register`.

## Getting started

### Install dependencies

```bash
bun install
```

### Run the local app

```bash
bun run dev
```

Then open http://localhost:3000 in your browser.

### Create a production build

```bash
bun run build
```

## Project structure

- app/(home)/page.tsx — landing page composition and responsive section layout
- app/(home)/content.ts — homepage data used for features, steps, and showcase cards
- app/auth/login/page.tsx — login experience
- app/auth/register/page.tsx — registration experience
- app/auth/layout.tsx — shared auth layout wrapper
- public/ — logo, background images, and SVG icon assets

