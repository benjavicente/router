const $$splitComponentImporter = () => import('arrow-function.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/solid-router';
const $$splitLoaderImporter = () => import('arrow-function.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/solid-router';
import { createFileRoute } from '@benjavicente/solid-router';
export const Route = createFileRoute('/posts')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});