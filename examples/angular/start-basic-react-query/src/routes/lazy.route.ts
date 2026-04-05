import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/lazy')({
  head: () => ({
    meta: [
      {
        title: 'Angular Start Lazy Route',
      },
      {
        name: 'description',
        content: 'Lazy route rendered through the Angular Start experimental adapter.',
      },
    ],
  }),
})
