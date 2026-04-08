import { Component } from '@angular/core'
import { createFileRoute } from '@benjavicente/angular-router-experimental'

export const Route = createFileRoute('/_pathlessLayout/_nested-layout/route-a')({
  component: () => RouteAComponent,
})

@Component({
  selector: 'route-component',
  standalone: true,
  template: `<div>I'm layout A!</div>`,
})
class RouteAComponent {}
