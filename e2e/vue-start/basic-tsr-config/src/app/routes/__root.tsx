import {
  Body,
  HeadContent,
  Html,
  Outlet,
  Scripts,
  createRootRoute,
} from '@benjavicente/vue-router'
import { TanStackRouterDevtools } from '@benjavicente/vue-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <Html>
      <head>
        <HeadContent />
      </head>
      <Body>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  )
}
