import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/other-route')({
  component: () => RouteComponent,
})

@Component({
  selector: 'route-component-other-route',
  standalone: true,
  template: `<div>Hello "/other-route"!</div>`,
})
class RouteComponent {}
