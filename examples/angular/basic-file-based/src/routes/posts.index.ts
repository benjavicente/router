import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/posts/')({
  component: () => PostsIndexComponent,
})

@Component({
  selector: 'route-component',
  standalone: true,
  template: `<div>Select a post.</div>`,
})
class PostsIndexComponent {}
