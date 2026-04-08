import {
  ErrorComponent,
  type ErrorComponentProps,
} from '@benjavicente/solid-router'

export function DefaultCatchBoundary(props: ErrorComponentProps) {
  return <ErrorComponent {...props} />
}
