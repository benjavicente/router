import { state, getCount } from "shared-indirect-ref.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-indirect-ref.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/shared-indirect')({
  loader: () => {
    state.count++;
    return {
      count: getCount()
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});