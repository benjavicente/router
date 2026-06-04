const $$splitComponentImporter = () => import('shared-with-side-effect.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
const $$splitLoaderImporter = () => import('shared-with-side-effect.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyFn } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
console.log('registry created');
export const Route = createFileRoute('/fx')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});