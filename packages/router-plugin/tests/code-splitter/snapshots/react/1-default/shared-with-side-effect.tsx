import { registry } from "shared-with-side-effect.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-with-side-effect.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
console.log('registry created');
export const Route = createFileRoute('/fx')({
  loader: async () => {
    registry.set('loaded', true);
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});