import { createAuth } from 'convex/auth'
import { setupFetchClient } from '@convex-dev/better-auth/react-start'
import { getCookie } from '@benjavicente/solid-start/server'

export const { fetchQuery, fetchMutation, fetchAction } =
  await setupFetchClient(createAuth, getCookie)
