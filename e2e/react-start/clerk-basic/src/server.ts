import {
  createStartHandler,
  defaultStreamHandler,
} from '@benjavicente/react-start/server'
import { createClerkHandler } from '@clerk/tanstack-react-start/server'
import { createRouter } from './router'

const startHandler = createStartHandler({
  createRouter,
})
const fetch = createClerkHandler(startHandler)(defaultStreamHandler)

export default {
  fetch,
}
