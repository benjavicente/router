import { store } from "shared-class.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-class.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/store')({
  loader: async () => {
    store.set('items', await fetch('/api'));
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});