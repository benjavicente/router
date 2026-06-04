import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'
import { Link, linkOptions } from '@benjavicente/react-router'

export const Route = createFileRoute('/linkProps')({
  component: LinkPropsPage,
})

function LinkPropsPage() {
  const linkProps = linkOptions({
    to: '/absolute',
  })

  return <Link {...linkProps} />
}
