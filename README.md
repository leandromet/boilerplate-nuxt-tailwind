# Main Libraries

- Nuxt - https://nuxt.com/docs/getting-started/introduction
- Tailwind - https://tailwindcss.com/docs/utility-first
- Shadcn Vue - https://www.shadcn-vue.com/docs/introduction.html

# Auxiliare Libraries

- Headlessui (primitive UI components using in Shadcn Vue) - https://headlessui.com
- Heroicons (icons) - https://www.npmjs.com/package/@heroicons/vue
- Lucide (icons) - https://lucide.dev/guide/packages/lucide-vue-next

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Deploy Cloudflare develpoment

Cloudflare has a CLI call wrangler, in case you not have

```bash
# npm
npm install -g wrangler
```

You need login on cloudflare:

```bash
# npm
wrangler login
```

Build the application for development:

```bash
# npm
npm run deploy-development
```
