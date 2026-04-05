import {
  defineVirtualSubtreeConfig,
  index,
  route,
} from '@benjavicente/virtual-file-routes'

export default defineVirtualSubtreeConfig([
  index('home.tsx'),
  route('[_]auth', 'auth.tsx'),
  route('[_]callback', 'callback.tsx'),
])
