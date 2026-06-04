import { createMiddleware, createServerFn } from '@benjavicente/react-start'

const starReexportMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    console.log('star reexport middleware triggered')
    return next({
      context: { starReexport: 'star-reexport-middleware-executed' } as const,
    })
  },
)

export const starReexportFactory = createServerFn().middleware([
  starReexportMiddleware,
])
