import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'
import { Outlet } from '@benjavicente/react-router'

export const Route = createFileRoute('/_pathlessLayout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <div>Layout</div>
      <hr />
      <Outlet />
    </div>
  )
}
