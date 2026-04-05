import {
  defineVirtualSubtreeConfig,
  index,
  route,
} from '@benjavicente/virtual-file-routes'

export default defineVirtualSubtreeConfig([
  index('home.tsx'),
  route('$id', 'details.tsx'),
])
