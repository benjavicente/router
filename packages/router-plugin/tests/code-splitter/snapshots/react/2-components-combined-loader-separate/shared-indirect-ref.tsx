const $$splitComponentImporter = () => import('shared-indirect-ref.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
const $$splitLoaderImporter = () => import('shared-indirect-ref.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/shared-indirect')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});