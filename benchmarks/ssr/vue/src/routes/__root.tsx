import {
  Body,
  HeadContent,
  Html,
  Outlet,
  Scripts,
  createRootRoute,
} from '@benjavicente/vue-router'

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: (s) => s as { q?: string },
})

function RootComponent() {
  return (
    <Html>
      <head>
        <HeadContent />
      </head>
      <Body>
        <Outlet />
        <Scripts />
      </Body>
    </Html>
  )
}
