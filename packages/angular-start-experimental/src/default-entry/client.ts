import {
  bootstrapTanstackStartApplication,
  TanStackStartRoot,
} from '@tanstack/angular-start-experimental-client'

bootstrapTanstackStartApplication(TanStackStartRoot, []).catch((err) =>
  console.error(err),
)
