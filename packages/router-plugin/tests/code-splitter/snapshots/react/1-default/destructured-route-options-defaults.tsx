import { loader } from "destructured-route-options-defaults.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('destructured-route-options-defaults.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/about')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader
});