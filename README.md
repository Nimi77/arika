# Arika

Arika is a lightweight AI-powered customer support web app built for African small businesses. It helps merchants respond to customer questions faster, recover lost sales, and manage customer conversations from one place.

## Overview

Arika is designed to reduce the time small business owners spend handling repetitive customer messages and responding to inquiries manually.

The application currently includes a responsive landing page and an authentication flow covering registration, login, social authentication, email verification, and business profile setup.

## Tech Stack

- **Next.js** — React framework using the App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling and responsive UI
- **Bun** — Package manager and runtime

## Features

- Responsive landing page
- User registration and login
- Google and Apple authentication
- Email verification
- Business profile setup
- Reusable authentication components
- Responsive mobile and desktop experience

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed.

### Installation

Clone the repository and install the dependencies:

```bash
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

Open http://localhost:3000 in your browser.

### Production

Create a production build:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Environment Variables

Create a `.env.local` file in the root of the project and add the required environment variables.

```env
NEXT_PUBLIC_API_URL=
```

Additional environment variables may be required depending on the authentication and API configuration.

> **Note:** Never commit `.env.local` or other files containing sensitive credentials to the repository.

## Authentication

Arika currently provides the following authentication routes:

- `/auth/login` — Sign in to an existing account
- `/auth/register` — Create a new account
- `/auth/verify-email` — Sends verification link to user's email address
- `/auth/profile-setup` — Complete business profile setup

Social authentication is supported through Google and Apple.

## Development Notes

The project uses the Next.js App Router and follows a reusable component-based approach. Homepage content is separated from the page layout to make content easier to maintain and update.

## License

This project is private and intended for development purposes.
