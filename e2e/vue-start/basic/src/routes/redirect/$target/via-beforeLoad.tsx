import { redirect, createFileRoute } from '@benjavicente/vue-router'

export const Route = createFileRoute('/redirect/$target/via-beforeLoad')({
  beforeLoad: ({
    params: { target },
    search: { reloadDocument, externalHost },
  }) => {
    switch (target) {
      case 'internal':
        throw redirect({ to: '/posts', reloadDocument })
      case 'external':
        throw redirect({ href: externalHost })
    }
  },
  component: () => <div>{Route.fullPath}</div>,
})
