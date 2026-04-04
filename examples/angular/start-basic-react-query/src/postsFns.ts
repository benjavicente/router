import { notFound } from '@tanstack/angular-router-experimental'
import { createServerFn } from '@tanstack/angular-start-experimental'

export type PostType = {
  id: number
  title: string
  body: string
}

export const fetchPost = createServerFn({ method: 'POST' })
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${data}`,
    )
    if (!res.ok) {
      if (res.status === 404) {
        throw notFound()
      }
      throw new Error('Failed to fetch post')
    }
    return (await res.json()) as PostType
  })

export const fetchPosts = createServerFn().handler(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  const posts = (await res.json()) as Array<PostType>
  return posts.slice(0, 10)
})
