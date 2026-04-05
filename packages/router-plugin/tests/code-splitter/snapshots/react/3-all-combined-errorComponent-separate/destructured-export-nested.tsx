const $$splitComponentImporter = () => import('destructured-export-nested.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
const getConfig = () => ({
  api: {
    baseUrl: 'https://api.example.com'
  },
  timeout: 5000,
  extra: 'data'
});
export const {
  api: {
    baseUrl
  },
  ...rest
} = getConfig();
export const Route = createFileRoute('/about')({
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});