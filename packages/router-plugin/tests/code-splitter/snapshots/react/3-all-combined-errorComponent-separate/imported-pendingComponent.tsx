const $$splitPendingComponentImporter = () => import('imported-pendingComponent.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
const $$splitComponentImporter = () => import('imported-pendingComponent.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  pendingComponent: lazyRouteComponent($$splitPendingComponentImporter, 'pendingComponent')
});