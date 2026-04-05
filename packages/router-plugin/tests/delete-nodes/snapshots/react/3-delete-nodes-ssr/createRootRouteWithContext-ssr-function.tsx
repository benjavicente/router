import { createRootRouteWithContext } from '@benjavicente/react-router';
export const Route = createRootRouteWithContext<{}>()({
  component: () => {
    return <div className="p-2">hello world</div>;
  }
});