import { queryOptions } from '@benjavicente/angular-query-experimental'
import { fetchPost, fetchPosts } from './postsFns'

export function allPostsQueryOptions() {
  return queryOptions({
    queryKey: ['posts', 'list'],
    queryFn: () => fetchPosts(),
  })
}

export function postQueryOptions(postId: string) {
  return queryOptions({
    queryKey: ['posts', 'detail', postId],
    queryFn: () => fetchPost({ data: postId }),
  })
}
