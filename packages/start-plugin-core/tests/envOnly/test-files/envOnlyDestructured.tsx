import { createServerOnlyFn, createClientOnlyFn } from '@benjavicente/react-start'

const serverFunc = createServerOnlyFn(() => 'server')

const clientFunc = createClientOnlyFn(() => 'client')
