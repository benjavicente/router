import { ErrorComponent } from '@benjavicente/vue-router'
import type { ErrorComponentProps } from '@benjavicente/vue-router'
import { defineComponent } from 'vue'

export const UserErrorComponent = defineComponent({
  props: {
    error: {
      type: Error,
      required: true,
    },
  },
  setup(props) {
    return () => <ErrorComponent error={props.error} />
  },
})
