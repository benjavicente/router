const $$splitErrorComponentImporter = () => import('imported-errorComponent.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
const $$splitComponentImporter = () => import('imported-errorComponent.tsx?tsr-split=component---errorComponent---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, 'errorComponent')
});