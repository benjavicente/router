import {
  defineHandlerCallback,
  renderRouterToString,
} from '@benjavicente/react-router/ssr/server'
import { StartServer } from './StartServer'

export const defaultRenderHandler = defineHandlerCallback(
  ({ router, responseHeaders }) =>
    renderRouterToString({
      router,
      responseHeaders,
      children: <StartServer router={router} />,
    }),
)
