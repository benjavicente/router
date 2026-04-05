import { Link, createFileRoute, linkOptions } from '@benjavicente/solid-router'

export const Route = createFileRoute('/linkProps')({
  component: LinkPropsPage,
})

function LinkPropsPage() {
  const linkProps = linkOptions({
    to: '/absolute',
  })

  return <Link {...linkProps} />
}
