import { createFileRoute } from '@benjavicente/react-router'
import { NoLoaderCssPageClient } from '~/utils/NoLoaderCssPageClient'

export const Route = createFileRoute('/rsc-query-no-loader-css')({
  component: RscQueryNoLoaderCssPage,
})

function RscQueryNoLoaderCssPage() {
  return <NoLoaderCssPageClient />
}
