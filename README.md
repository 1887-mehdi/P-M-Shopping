# Gate of Purchase

An editorial storefront concept for everyday clothing, rebuilt as a responsive React application. The visual direction pairs a warm, paper-like palette with oversized editorial typography and product photography from the original project.

## Features

- Responsive storefront with category filters, search, and price sorting
- Product detail pages with selectable sizes and a size guide
- Shopping bag with quantity controls, shipping threshold, and order summary
- Saved items, browser-persisted bag and wishlist
- Newsletter interaction and demo checkout flow
- Accessible labels, keyboard search shortcut (`/`), reduced-motion support, and empty states

## Built with

React 19, TypeScript, Vite 8, React Router 7, Redux Toolkit, React Redux, Lucide icons, and Prettier.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local address after the development server starts. To create and preview a production build:

```sh
npm run typecheck
npm run build
npm run preview
```

Run `npm run format` to format the application source.

## Structure

```text
src/
  app/                 Redux store and typed hooks
  data/                Local product catalogue
  features/shop/        Cart, wishlist, search, and catalogue state
  assets/products/      Storefront product photography
  App.tsx               Routes and storefront views
  styles.css            Responsive visual system
```

The original downloaded site files are kept out of the GitHub repository; only assets used by the React storefront are included.

The catalogue is local demo data. Bag and wishlist state persist in the current browser using `localStorage`. Checkout and newsletter interactions are front-end demonstrations; this build does not process payments, collect email subscriptions, or connect to an inventory service.

## Before a live launch

Connect a product API and inventory, choose a payment provider, wire up newsletter and support services, and review the image and font licenses before publishing.
