import { createFileRoute, redirect } from '@benjavicente/react-router'
import { createServerFn } from '@benjavicente/react-start'
import { setCookie } from '@benjavicente/react-start/server'

const setMultipleCookiesAndRedirect = createServerFn().handler(() => {
  // Set multiple cookies before redirecting
  // This tests that multiple Set-Cookie headers are preserved during redirect
  setCookie('session', 'session-value', { path: '/' })
  setCookie('csrf', 'csrf-token-value', { path: '/' })
  setCookie('theme', 'dark', { path: '/' })

  throw redirect({ to: '/multi-cookie-redirect/target' })
})

export const Route = createFileRoute('/multi-cookie-redirect/')({
  loader: () => setMultipleCookiesAndRedirect(),
  component: () => null,
})
