# TanStack Start - Angular SPA Mode

This example runs the Angular Start adapter with SPA mode enabled.

What is included:

- `@benjavicente/angular-start-experimental/plugin/vite` wired into Vite
- `spa.enabled: true` to generate a static SPA shell during build
- the default SPA shell output at `/_shell.html`
- file-based Angular routes under `src/routes`
- a small nested route set with lazy route loading and route params
- Angular router devtools

Run it with:

```sh
pnpm run dev
```

Build it with:

```sh
pnpm run build
```

The build should emit the SPA shell at `/_shell.html`, matching TanStack Start SPA mode behavior.

The React docs show optional link crawling through `spa.prerender.crawlLinks`.
This Angular example intentionally keeps crawling off until Angular Start's
server cleanup path is stable under prerender crawling.
