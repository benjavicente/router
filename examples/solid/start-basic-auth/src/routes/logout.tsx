import { createFileRoute, redirect } from '@benjavicente/solid-router'
import { createServerFn } from '@benjavicente/solid-start'
import { useAppSession } from '~/utils/session'

const logoutFn = createServerFn().handler(async () => {
  const session = await useAppSession()

  session.clear()

  throw redirect({
    href: '/',
  })
})

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn(),
})
