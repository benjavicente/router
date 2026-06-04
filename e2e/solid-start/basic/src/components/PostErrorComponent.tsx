import { ErrorComponent, ErrorComponentProps } from '@benjavicente/solid-router'

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}
