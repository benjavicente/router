import {
  createServerOnlyFn as serverFn,
  createClientOnlyFn as clientFn,
} from '@benjavicente/react-start'

const serverFunc = serverFn(() => 'server')

const clientFunc = clientFn(() => 'client')
