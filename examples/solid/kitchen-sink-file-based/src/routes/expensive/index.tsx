import { createFileRoute } from '@benjavicente/solid-router'
import Expensive from './-components/Expensive'

export const Route = createFileRoute('/expensive/')({
  component: Expensive,
})
