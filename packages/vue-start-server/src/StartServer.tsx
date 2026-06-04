import * as Vue from 'vue'
import { RouterProvider } from '@benjavicente/vue-router'
import type { AnyRouter } from '@benjavicente/router-core'

export const StartServer = Vue.defineComponent({
  name: 'StartServer',
  props: {
    router: {
      type: Object as () => AnyRouter,
      required: true,
    },
  },
  setup(props) {
    return () => Vue.h(RouterProvider, { router: props.router })
  },
})
