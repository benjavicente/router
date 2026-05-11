import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'
import { Link, Outlet } from '@benjavicente/react-router'

export const Route = createFileRoute('/(test)/duplicate-import')({
  component: PostsLayoutComponent,
})

function PostsLayoutComponent() {
  return (
    <>
      <Link to="/">Home</Link>
      <Outlet />
    </>
  )
}
