import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
    </div>
  )
}
