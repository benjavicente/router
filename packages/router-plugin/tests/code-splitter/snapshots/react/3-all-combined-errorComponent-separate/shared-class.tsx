const $$splitComponentImporter = () => import('shared-class.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
const $$splitLoaderImporter = () => import('shared-class.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyFn } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
class DataStore {
  data = new Map();
  get(k: string) {
    return this.data.get(k);
  }
  set(k: string, v: unknown) {
    this.data.set(k, v);
  }
}
export const Route = createFileRoute('/store')({
  loader: lazyFn($$splitLoaderImporter, 'loader'),
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});