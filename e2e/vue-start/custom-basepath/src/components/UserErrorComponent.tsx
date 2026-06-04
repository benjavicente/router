import { ErrorComponent } from '@benjavicente/vue-router'
import type { ErrorComponentProps } from '@benjavicente/vue-router'

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
