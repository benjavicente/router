import { createFileRoute, redirect } from '@benjavicente/react-router'
import { createServerFn } from '@benjavicente/react-start'
import { pageStyles } from '~/utils/styles'

const redirectToBasic = createServerFn({
  method: 'GET',
}).handler(async () => {
  throw redirect({ to: '/rsc-basic' })
})

export const Route = createFileRoute('/rsc-server-redirect')({
  loader: async () => {
    await redirectToBasic()
  },
  component: RscServerRedirectComponent,
})

function RscServerRedirectComponent() {
  return (
    <div style={pageStyles.container}>
      <h1 data-testid="rsc-server-redirect-title" style={pageStyles.title}>
        RSC Server Redirect
      </h1>
    </div>
  )
}
