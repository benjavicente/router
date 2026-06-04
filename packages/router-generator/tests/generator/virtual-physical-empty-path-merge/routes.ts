import { physical, rootRoute, route } from '@benjavicente/virtual-file-routes'

export const routes = rootRoute('__root.tsx', [
  // Virtual route defined here
  route('/about', 'about.tsx'),
  // Physical mount with empty path - should merge into root level
  physical('', 'merged'),
])
