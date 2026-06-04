import { createRootRoute } from '@benjavicente/react-router';
export const Route = createRootRoute({
  component: () => {
    return <div className="p-2">hello world</div>;
  }
});