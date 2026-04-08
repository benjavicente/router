import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/posts/')({
  component: () => PostsIndexComponent,
})

@Component({
  selector: 'route-component',
  standalone: true,
  template: `
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">Select a post</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        This area is rendered by nested Angular file-based routes inside the
        Start scaffold.
      </p>
    </div>
  `,
})
class PostsIndexComponent {
  constructor() {
    console.log('post layout rendered')
  }
}
