import { index, physical, rootRoute } from '@benjavicente/virtual-file-routes'

export const routes = rootRoute('__root.tsx', [
  index('index.tsx'),
  physical('/feature', 'feature'),
])
