import { createFileRoute } from '@benjavicente/vue-router'
export const Route = createFileRoute('/users/')({
  component: UsersIndexComponent,
})

function UsersIndexComponent() {
  return <div>Select a user.</div>
}
