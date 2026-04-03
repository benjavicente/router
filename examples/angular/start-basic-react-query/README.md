# TanStack Start - Angular Basic Scaffold

This example scaffolds the Angular Start package shape against the existing file-based Angular router setup.

What is included:

- `@tanstack/angular-start-experimental/plugin/vite` wired into Vite
- file-based Angular routes under `src/routes`
- a client entry that bootstraps the router without Angular hydration APIs
- a server entry that returns `501 Not Implemented` until Angular Start SSR is added

This example is intentionally scaffold-grade. It documents the file and package layout needed for a future Angular Start adapter without claiming that Angular SSR or hydration is finished.