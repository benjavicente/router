import { Injectable } from '@angular/core'
import { queryOptions } from '@benjavicente/angular-query-experimental'
import { injectServerFn } from '@tanstack/angular-start-experimental'
import { fetchPost, fetchPosts } from './postsFns'

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly fetchPostsRemote = injectServerFn(fetchPosts)
  private readonly fetchPostRemote = injectServerFn(fetchPost)

  allPostsQueryOptions() {
    return queryOptions({
      queryKey: ['posts', 'list'],
      queryFn: () => this.fetchPostsRemote(),
    })
  }

  postQueryOptions(postId: string) {
    return queryOptions({
      queryKey: ['posts', 'detail', postId],
      queryFn: () => this.fetchPostRemote({ data: postId }),
    })
  }
}
