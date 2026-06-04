import { ErrorComponent, ErrorComponentProps } from '@benjavicente/vue-router'

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
