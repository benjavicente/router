import { createMiddleware } from '@benjavicente/react-start';
export const fnMw = createMiddleware({
  type: 'function'
}).client(() => {
  console.log('client');
});