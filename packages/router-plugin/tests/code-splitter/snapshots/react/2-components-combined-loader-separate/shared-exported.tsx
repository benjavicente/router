const $$splitComponentImporter = () => import('shared-exported.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
const $$splitLoaderImporter = () => import('shared-exported.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/query')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});
export { queryOptions } from "shared-exported.tsx?tsr-shared=1";