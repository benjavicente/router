import { redirect, createFileRoute } from '@benjavicente/react-router'
import { createServerFn } from '@benjavicente/react-start'
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
