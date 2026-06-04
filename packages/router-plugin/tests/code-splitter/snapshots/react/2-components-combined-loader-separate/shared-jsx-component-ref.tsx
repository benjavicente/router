const $$splitComponentImporter = () => import('shared-jsx-component-ref.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
const $$splitLoaderImporter = () => import('shared-jsx-component-ref.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
// @ts-nocheck
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/jsx')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});