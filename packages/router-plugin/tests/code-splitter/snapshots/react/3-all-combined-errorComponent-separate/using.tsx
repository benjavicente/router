const $$splitLoaderImporter = () => import('using.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyFn } from '@benjavicente/react-router';
export const Route = createFileRoute({
  loader: lazyFn($$splitLoaderImporter, 'loader')
});