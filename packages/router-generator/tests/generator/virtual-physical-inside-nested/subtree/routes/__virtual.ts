import {
  defineVirtualSubtreeConfig,
  layout,
  physical,
} from '@benjavicente/virtual-file-routes'

export default defineVirtualSubtreeConfig([
  layout('./_layout.tsx', [physical('/foo', '../foo/routes')]),
])
