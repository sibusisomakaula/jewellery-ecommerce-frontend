# Jewellery E-commerce Frontend

The web frontend for a jewellery e-commerce system, built with Vue, Vite and Tailwind CSS. It talks to the [backend API](https://github.com/sibusisomakaula/jewellery-ecommerce-backend).

## Tech stack

- Vue
- Vite
- Tailwind CSS / PostCSS

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- The backend running locally (see the backend repo)

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/sibusisomakaula/jewellery-ecommerce-frontend.git
cd jewellery-ecommerce-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Vite will print a local address (usually `http://localhost:5173`). Open it in your browser.

## Build for production

```bash
npm run build
```

The output goes into the `dist` folder.

## Project structure

```
src/            Application source code
index.html      Entry HTML file
vite.config.js  Vite configuration
tailwind.config.js  Tailwind configuration
```

## Backend connection

Make sure the backend is running before using the app. If the API address in the code differs from where your backend runs, update it in the project's API configuration.
