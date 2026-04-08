import { ErrorComponent } from '@benjavicente/solid-router'
import type { ErrorComponentProps } from '@benjavicente/solid-router'

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
