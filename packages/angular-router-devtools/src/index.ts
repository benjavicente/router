import { Component, input } from '@angular/core'
import type { TanStackRouterDevtoolsOptions } from './tanstack-router-devtools'
import type { TanStackRouterDevtoolsPanelOptions } from './tanstack-router-devtools-panel'

@Component({
  selector: 'router-devtools',
  template: '',
  standalone: true,
})
export class TanStackRouterDevtools {
  initialIsOpen = input<TanStackRouterDevtoolsOptions['initialIsOpen']>()
  panelProps = input<TanStackRouterDevtoolsOptions['panelProps']>()
  closeButtonProps = input<TanStackRouterDevtoolsOptions['closeButtonProps']>()
  toggleButtonProps =
    input<TanStackRouterDevtoolsOptions['toggleButtonProps']>()
  position = input<TanStackRouterDevtoolsOptions['position']>()
  containerElement = input<TanStackRouterDevtoolsOptions['containerElement']>()
  router = input<TanStackRouterDevtoolsOptions['router']>()
  shadowDOMTarget = input<TanStackRouterDevtoolsOptions['shadowDOMTarget']>()
}

@Component({
  selector: 'router-devtools-panel',
  template: '',
  standalone: true,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class TanStackRouterDevtoolsPanel {
  style = input<TanStackRouterDevtoolsPanelOptions['style']>()
  className = input<TanStackRouterDevtoolsPanelOptions['className']>()
  isOpen = input<TanStackRouterDevtoolsPanelOptions['isOpen']>()
  setIsOpen = input<TanStackRouterDevtoolsPanelOptions['setIsOpen']>()
  handleDragStart =
    input<TanStackRouterDevtoolsPanelOptions['handleDragStart']>()
  router = input<TanStackRouterDevtoolsPanelOptions['router']>()
  shadowDOMTarget =
    input<TanStackRouterDevtoolsPanelOptions['shadowDOMTarget']>()
}

export type { TanStackRouterDevtoolsOptions } from './tanstack-router-devtools'
export type { TanStackRouterDevtoolsPanelOptions } from './tanstack-router-devtools-panel'
