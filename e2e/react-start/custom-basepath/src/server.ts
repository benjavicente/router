import handler from '@benjavicente/react-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
