const $$splitComponentImporter = () => import('imported-pendingComponent.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
import { importedPendingComponent } from '../../shared/imported';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  pendingComponent: importedPendingComponent
});