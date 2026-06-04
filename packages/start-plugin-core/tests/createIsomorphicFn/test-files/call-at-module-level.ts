import { createIsomorphicFn } from '@benjavicente/react-start'

const getEnvironment = createIsomorphicFn()
  .server(() => {
    console.log('[SERVER] getEnvironment called')
    return 'server'
  })
  .client(() => {
    console.log('[CLIENT] getEnvironment called')
    return 'client'
  })

const moduleLevel = getEnvironment()
