import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'
import { Outlet } from '@benjavicente/react-router'

export const Route = createFileRoute('/_pathlessLayout')({
  component: PathlessLayoutComponent,
})

function PathlessLayoutComponent() {
  return (
    <div>
      <div>Pathless Layout</div>
      <hr />
      <Outlet />
    </div>
  )
}
