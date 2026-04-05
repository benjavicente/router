import { apiUrl } from "shared-destructured.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-destructured.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/config')({
  loader: async () => fetch(apiUrl),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});