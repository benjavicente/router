import { createFileRoute } from '@benjavicente/react-router'
export const Route = createFileRoute('/posts/$postId/deep')({
  context: () => ({ someContext: 'context' }),
  loaderDeps: () => ({ dep: 1 }),
  loader: () => ({ data: 'data' }),
  component: () => <div>Hello /posts/$postId/deep!</div>,
})
