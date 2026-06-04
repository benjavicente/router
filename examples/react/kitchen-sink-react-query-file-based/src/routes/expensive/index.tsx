import { createFileRoute } from '@benjavicente/react-router'
import Expensive from './-components/Expensive'

export const Route = createFileRoute('/expensive/')({
  component: Expensive,
})
