import {
  bootstrapTanstackStartApplication,
  TanStackStartRoot,
} from '@benjavicente/angular-start-experimental-client'

bootstrapTanstackStartApplication(TanStackStartRoot, []).catch((err) =>
  console.error(err),
)
