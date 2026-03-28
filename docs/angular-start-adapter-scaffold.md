# Angular Start Adapter Scaffold Notes

This note captures what each existing Start adapter needs, what was scaffolded for Angular, and what still has to change before Angular Start can match the React and Solid adapters.

Path references below use repo-relative `path:line` notation so they can be copied into editor links.

## Existing adapter pattern

### Common Start wrapper contract

All Start adapters follow the same top-level contract:

- top-level package re-exports Start core and framework helpers
- dedicated `client` package exposes `StartClient` and `hydrateStart`
- dedicated `server` package exposes `StartServer`, `defaultRenderHandler`, and `defaultStreamHandler`
- Vite plugin points `TanStackStartVitePluginCore` at framework-specific default entries

Reference files:

- `packages/react-start/src/index.ts:1`
- `packages/react-start/src/client.tsx:1`
- `packages/react-start/src/server.tsx:1`
- `packages/react-start/src/plugin/vite.ts:1`
- `packages/solid-start/src/index.ts:1`
- `packages/solid-start/src/client.tsx:1`
- `packages/solid-start/src/server.tsx:1`
- `packages/solid-start/src/plugin/vite.ts:1`

### React-specific needs

React Start needs:

- a real default client entry that hydrates with `hydrateRoot`
- a server renderer that can stream React output
- a router wrapper component that can render immediately on both client and server

Reference files:

- `packages/react-start/src/default-entry/client.tsx:1`
- `packages/react-start-server/src/defaultStreamHandler.tsx:1`
- `packages/react-start-server/src/defaultRenderHandler.tsx:1`
- `packages/react-start-client/src/StartClient.tsx:1`

### Solid-specific needs

Solid Start needs:

- a real default client entry that hydrates with Solid’s `hydrate`
- SSR handlers that render through the Solid router server APIs
- a thin `RouterProvider` wrapper for both client and server

Reference files:

- `packages/solid-start/src/default-entry/client.tsx:1`
- `packages/solid-start-server/src/defaultStreamHandler.tsx:1`
- `packages/solid-start-server/src/defaultRenderHandler.tsx:1`
- `packages/solid-start-client/src/StartClient.tsx:1`

### Vue-specific needs

Vue Start needs:

- a real hydration setup with Vue app mounting
- SSR render handlers using Vue SSR helpers
- extra hydration-warning handling around expected mismatches

Reference files:

- `packages/vue-start/src/default-entry/client.tsx:1`
- `packages/vue-start-server/src/defaultStreamHandler.tsx:1`
- `packages/vue-start-server/src/defaultRenderHandler.tsx:1`
- `packages/vue-start-client/src/hydrateStart.ts:1`

## Angular scaffold status

### What exists now

The scaffold now provides the same package split as Solid:

- `packages/angular-start-experimental/package.json:1`
- `packages/angular-start-experimental-client/package.json:1`
- `packages/angular-start-experimental-server/package.json:1`

It also wires Angular into the shared Start framework selection:

- `packages/start-plugin-core/src/types.ts:1`
- `packages/start-plugin-core/src/frameworkPackages.ts:1`
- `packages/start-plugin-core/src/start-router-plugin/plugin.ts:30`
- `packages/start-plugin-core/src/start-compiler-plugin/plugin.ts:1`
- `packages/start-plugin-core/src/start-compiler-plugin/handleCreateServerFn.ts:1`

The example uses the intended Start package and file-based Angular routes:

- `examples/angular/start-basic/vite.config.ts:1`
- `examples/angular/start-basic/src/router.ts:1`
- `examples/angular/start-basic/src/routes/__root.ts:1`
- `examples/angular/start-basic/src/routeTree.gen.ts:124`

### What is still placeholder-only

These files are intentionally placeholders and still need real Angular runtime behavior:

- default client entry placeholder: `packages/angular-start-experimental/src/default-entry/client.ts:1`
- default server entry placeholder: `packages/angular-start-experimental/src/default-entry/server.ts:4`
- client wrapper placeholder: `packages/angular-start-experimental/src/internals/StartClient.ts:3`
- server wrapper placeholder: `packages/angular-start-experimental/src/internals/StartServer.ts:3`
- deferred hydration wrapper: `packages/angular-start-experimental/src/internals/hydrateStart.ts:4`

## Review of temporary or hacky pieces

### Explicitly documented temporary pieces

These are temporary and now marked with TODO comments:

- source import hack in the Angular Start Vite plugin:
  `packages/angular-start-experimental/src/plugin/vite.ts:2`
  This imports `start-plugin-core` from source instead of the package build because the shared Start packages currently have unrelated build/type failures in this branch.

- redirect cast in `useServerFn`:
  `packages/angular-start-experimental/src/useServerFn.ts:20`
  This keeps parity with the other adapters’ redirect handling, but Angular does not yet have a tighter typed helper surface here.

- placeholder default entries:
  `packages/angular-start-experimental/src/default-entry/client.ts:1`
  `packages/angular-start-experimental/src/default-entry/server.ts:4`

- placeholder example bootstrap/server setup:
  `examples/angular/start-basic/src/client.ts:12`
  `examples/angular/start-basic/src/app/app.config.ts:3`
  `examples/angular/start-basic/src/app/app.config.server.ts:3`
  `examples/angular/start-basic/src/server.ts:5`

### Things that should not remain long-term

These should be removed before Angular Start is considered real:

- importing `start-plugin-core` from source in the published Angular Start package
- `as any` redirect coercion in `useServerFn`
- `501` placeholder server entries in both package and example
- source import from `start-plugin-core` in the Angular Start Vite plugin

## Example structure review

### Where the example matches React and Solid

The example matches the broad Start example shape:

- one `vite.config.ts` with `tanstackStart(...)`
- one `src/router.*` entry returning `getRouter()`
- file-based routes under `src/routes`
- generated route tree under `src/routeTree.gen.ts`

Reference comparisons:

- React example Vite/router: `examples/react/start-basic/vite.config.ts:1`, `examples/react/start-basic/src/router.tsx:1`
- Solid example Vite/router: `examples/solid/start-basic/vite.config.ts:1`, `examples/solid/start-basic/src/router.tsx:1`
- Angular scaffold Vite/router: `examples/angular/start-basic/vite.config.ts:1`, `examples/angular/start-basic/src/router.ts:1`

### Where Angular still differs

The example now has the conventional Angular shell split:

- `examples/angular/start-basic/src/app/app.ts:1`
- `examples/angular/start-basic/src/app/app.config.ts:1`
- `examples/angular/start-basic/src/app/app.config.server.ts:1`
- `examples/angular/start-basic/src/client.ts:1`
- `examples/angular/start-basic/src/server.ts:1`

What still differs from React and Solid is not file layout anymore, but missing provider semantics and missing SSR rendering. The files exist, but their provider arrays are still placeholders and the server entry still returns `501`.

## What Angular specifically still needs

Angular Start will likely need framework-specific decisions in these areas:

### Client bootstrap and hydration

- whether Start exposes a `StartClient` component, a bootstrap helper, or both
- how `bootstrapApplication()` composes router providers with Start providers
- when Angular hydration is considered complete so Start can signal stream cleanup
- whether `provideClientHydration()` or equivalent Angular hydration providers are required

Current relevant scaffold files:

- `packages/angular-start-experimental/src/default-entry/client.ts:1`
- `packages/angular-start-experimental/src/internals/hydrateStart.ts:4`
- `examples/angular/start-basic/src/client.ts:12`
- `examples/angular/start-basic/src/app/app.config.ts:3`

### Server rendering and providers

- how Angular renders a document or application shell on the server
- how request-scoped providers are injected
- how Start request context is passed into Angular dependency injection
- how server-side router/app providers are split from client providers

Current relevant scaffold files:

- `packages/angular-start-experimental/src/default-entry/server.ts:4`
- `packages/angular-start-experimental/src/internals/StartServer.ts:3`
- `examples/angular/start-basic/src/app/app.config.server.ts:3`
- `examples/angular/start-basic/src/server.ts:5`

### Angular app setup conventions

If Angular Start follows common Angular standalone app setup, the example should keep this split and fill it in with real behavior:

- `src/app/app.ts` for the root standalone component
- `src/app/app.config.ts` for shared providers
- `src/app/app.config.server.ts` for server-only providers
- `src/client.ts` reduced to bootstrap wiring only
- `src/server.ts` reduced to server render wiring only

That file shape is now in place. The remaining work is to replace the placeholder provider arrays and `501` server response with real Angular Start behavior.

## Recommended next implementation steps

1. Fix the shared Start core build/type issues so Angular Start can import `@tanstack/start-plugin-core` normally instead of from source.
2. Decide the Angular public bootstrap model: component-based, bootstrap-helper-based, or both.
3. Define provider composition for client and server separately.
4. Replace the `501` server placeholders with real Angular SSR handling.
5. Restructure the Angular example toward `app.ts` plus `app.config.ts` once the provider model is decided.
