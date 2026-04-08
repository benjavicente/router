import { ErrorComponent } from '@benjavicente/solid-router'
import type { ErrorComponentProps } from '@benjavicente/solid-router'

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
