import { notFound } from '@benjavicente/angular-router-experimental'

export type PostType = {
  id: string
  title: string
  body: string
}

export const fetchPost = async (postId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
  if (res.status === 404) {
    throw notFound()
  }
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return res.json() as Promise<PostType>
}

export const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error(await res.text())
  }
  const data = (await res.json()) as Array<PostType>
  return data.slice(0, 8)
}
