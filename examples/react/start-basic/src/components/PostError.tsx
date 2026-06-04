import { ErrorComponent } from '@benjavicente/react-router'
import type { ErrorComponentProps } from '@benjavicente/react-router'

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
