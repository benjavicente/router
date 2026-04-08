const $$splitComponentImporter = () => import('boolean-null-literals.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';

// Test errorComponent with false literal
export const Route = createFileRoute('/test')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  errorComponent: false,
  pendingComponent: null,
  loader: async () => ({
    data: 'test'
  })
});