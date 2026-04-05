const $$splitComponentImporter = () => import('shared-imported-binding.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
import { sharedUtil } from '../utils';
export const Route = createFileRoute('/imported')({
  loader: async () => sharedUtil('load'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});