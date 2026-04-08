import { ErrorComponent, type ErrorComponentProps } from '@benjavicente/vue-router'

export function DefaultCatchBoundary(props: ErrorComponentProps) {
  return <ErrorComponent {...props} />
}
