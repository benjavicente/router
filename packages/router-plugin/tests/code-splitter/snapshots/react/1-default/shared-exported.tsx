import { queryOptions } from "shared-exported.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-exported.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/query')({
  loader: async () => {
    return {
      staleTime: queryOptions.staleTime
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});
export { queryOptions } from "shared-exported.tsx?tsr-shared=1";