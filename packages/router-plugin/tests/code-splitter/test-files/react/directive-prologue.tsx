'use client'

import { createFileRoute } from '@benjavicente/react-router'

export const Route = createFileRoute('/directive')({
  component: () => {
    return <div>directive preserved</div>
  },
})
