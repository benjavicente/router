import { createFileRoute } from '@benjavicente/react-router'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div data-testid="home-content">
      <p>
        {m.example_message({
          username: 'TanStack Router!',
        })}
      </p>
    </div>
  )
}
