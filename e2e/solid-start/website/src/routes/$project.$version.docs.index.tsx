import { redirect, createFileRoute } from '@benjavicente/solid-router'

export const Route = createFileRoute('/$project/$version/docs/')({
  beforeLoad: () => {
    throw redirect({
      from: '/$project/$version/docs/',
      to: '/$project/$version/docs/framework/$framework/$',
      params: {
        framework: 'solid',
        _splat: 'overview',
      },
    })
  },
})
