const $$splitLoaderImporter = () => import('destructured-route-options-defaults.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
const $$splitComponentImporter = () => import('destructured-route-options-defaults.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/about')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: lazyFn($$splitLoaderImporter, 'loader')
});