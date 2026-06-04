const $$splitComponentImporter = () => import('importAttribute.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});