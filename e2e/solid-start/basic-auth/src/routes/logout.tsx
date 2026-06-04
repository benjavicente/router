import { redirect, createFileRoute } from '@benjavicente/solid-router'
import { createServerFn } from '@benjavicente/solid-start'

import { useAppSession } from '~/utils/session'

const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
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
