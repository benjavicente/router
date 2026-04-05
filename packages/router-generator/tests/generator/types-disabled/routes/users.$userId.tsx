// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createFileRoute } from '@benjavicente/react-router'
import * as React from 'react'

export const Route = createFileRoute('/users/$userId')({
  component: () => <div>Hello /users/$userId!</div>,
})
