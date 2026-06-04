import { HEADER } from "shared-referencing-route.tsx?tsr-shared=1";
const $$splitComponentImporter = () => import('shared-referencing-route.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
function usePageTitle() {
  return `${HEADER} - ${Route.fullPath}`;
}
export const Route = createFileRoute('/about')({
  loader: async () => {
    const title = usePageTitle();
    return {
      title
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});