import handler from '@benjavicente/vue-start/server-entry'

export default {
  fetch(request: Request) {
    return handler.fetch(request)
  },
}
