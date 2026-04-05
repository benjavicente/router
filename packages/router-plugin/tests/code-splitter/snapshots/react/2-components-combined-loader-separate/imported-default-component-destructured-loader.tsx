const $$splitLoaderImporter = () => import('imported-default-component-destructured-loader.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
const $$splitComponentImporter = () => import('imported-default-component-destructured-loader.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: lazyFn($$splitLoaderImporter, 'loader')
});