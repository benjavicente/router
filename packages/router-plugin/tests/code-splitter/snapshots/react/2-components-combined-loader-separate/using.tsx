const $$splitLoaderImporter = () => import('using.tsx?tsr-split=loader');
import { lazyFn } from '@benjavicente/react-router';
export const Route = createFileRoute({
  loader: lazyFn($$splitLoaderImporter, 'loader')
});