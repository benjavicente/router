const $$splitLoaderImporter = () => import('destructured-react-memo-imported-component.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
const $$splitComponentImporter = () => import('destructured-react-memo-imported-component.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: lazyFn($$splitLoaderImporter, 'loader')
});