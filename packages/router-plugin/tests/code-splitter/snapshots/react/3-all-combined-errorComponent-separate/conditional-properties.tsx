const $$splitLoaderImporter = () => import('conditional-properties.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyFn } from '@benjavicente/react-router';
const $$splitComponentImporter = () => import('conditional-properties.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/posts')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: lazyFn($$splitLoaderImporter, 'loader')
});