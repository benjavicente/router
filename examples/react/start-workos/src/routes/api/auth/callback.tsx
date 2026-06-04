import { createFileRoute } from '@benjavicente/react-router';
import { handleCallbackRoute } from '@workos/authkit-tanstack-react-start';

export const Route = createFileRoute('/api/auth/callback')({
  server: {
    handlers: {
      GET: handleCallbackRoute(),
    },
  },
});
