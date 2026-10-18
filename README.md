# Prince Sonkar Portfolio

Personal portfolio website for Prince Sonkar, a data scientist and machine learning engineer. The site is designed as an interactive, scroll-driven experience rather than a static resume, combining animated content sections with an interactive 3D character built with React Three Fiber.

## Features

-   Responsive portfolio experience for desktop and mobile
-   Sections for About, What I Do, Career, Work, Tech Stack, Certificates, and Contact
-   Smooth scrolling and scroll-triggered animation with GSAP
-   Interactive 3D character scene with Three.js, React Three Fiber, and Rapier
-   Lazy-loaded sections and character assets to reduce the initial page cost

## Tech Stack

-   React 18 and TypeScript
-   Vite
-   Three.js, React Three Fiber, Drei, and Rapier
-   GSAP and ScrollTrigger
-   ESLint

## Getting Started

### Prerequisites

-   Node.js 18 or newer
-   npm

### Install and run locally

```bash
cd prince-portfolio
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### Verify a production build

Run the build and preview commands before deploying changes:

```bash
npm run build
npm run preview
```

The preview server serves the generated files locally so the production bundle and public assets can be checked together.

## Available Commands

Run these commands from `prince-portfolio`:

```bash
npm run dev      # Start the development server
npm run lint     # Check the project with ESLint
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
```

## Project Structure

```text
prince-portfolio/
├── public/                  # Public images, models, and decoder assets
├── src/
│   ├── components/          # Portfolio sections and 3D character scene
│   ├── context/             # Application loading state
│   ├── data/                # Shared data used by the UI
│   └── utils/               # Animation and interaction helpers
├── index.html
└── package.json
```

The `public/models` directory contains the encrypted character model and its supporting environment assets. Keep these files available when deploying the site; the 3D scene loads them at runtime.

## Production Build

```bash
cd prince-portfolio
npm run build
```

The generated production files are written to `prince-portfolio/dist`.