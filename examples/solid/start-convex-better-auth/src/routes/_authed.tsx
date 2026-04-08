import { Outlet, createFileRoute, redirect } from '@benjavicente/solid-router'
import { fetchUser } from '~/library/server'

export const Route = createFileRoute('/_authed')({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  beforeLoad: async (ctx) => {
    const user = await fetchUser()
    if (!ctx.context.token) {
      throw redirect({
        to: '/',
      })
    }
    return { user }
  },
})
