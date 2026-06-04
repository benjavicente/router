import { redirect, createFileRoute } from '@benjavicente/react-router'
import { createServerFn } from '@benjavicente/react-start'
import { getSupabaseServerClient } from '../utils/supabase'

const logoutFn = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      error: true,
      message: error.message,
    }
  }

  throw redirect({
    href: '/',
  })
})

export const Route = createFileRoute('/logout')({
  preload: false,
  loader: () => logoutFn(),
})
