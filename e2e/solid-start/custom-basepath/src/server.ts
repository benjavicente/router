import handler from '@benjavicente/solid-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
