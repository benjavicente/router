import { createFileRoute } from '@benjavicente/react-router'
// @ts-nocheck
// @ts-expect-error - we deliberately testing route that should not be created
export const Route = createFileRoute('/imIgnored')()
