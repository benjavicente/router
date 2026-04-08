import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import {
  injectRouter,
  injectStore,
} from '@benjavicente/angular-router-experimental'
import { TanStackRouterDevtoolsCore } from '@benjavicente/router-devtools-core'
import type { AnyRouter } from '@benjavicente/angular-router-experimental'

export interface TanStackRouterDevtoolsOptions {
  /**
   * Set this true if you want the dev tools to default to being open
   */
  initialIsOpen?: boolean
  /**
   * Use this to add props to the panel. For example, you can add className, style (merge and override default style), etc.
   */
  panelProps?: Record<string, any>
  /**
   * Use this to add props to the close button. For example, you can add className, style (merge and override default style), onClick (extend default handler), etc.
   */
  closeButtonProps?: Record<string, any>
  /**
   * Use this to add props to the toggle button. For example, you can add className, style (merge and override default style), onClick (extend default handler), etc.
   */
  toggleButtonProps?: Record<string, any>
  /**
   * The position of the TanStack Router logo to open and close the devtools panel.
   * Defaults to 'bottom-left'.
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /**
   * Use this to render the devtools inside a different type of container element for a11y purposes.
   * Any string which corresponds to a valid intrinsic JSX element is allowed.
   * Defaults to 'footer'.
   */
  containerElement?: string | any
  /**
   * The router instance to use for the devtools, infered in the injector context if no provided.
   */
  router?: AnyRouter
  /**
   * Use this to attach the devtool's styles to specific element in the DOM.
   */
  shadowDOMTarget?: ShadowRoot
}

@Component({
  selector: 'router-devtools',
  template: '',
})
export class TanStackRouterDevtools {
  initialIsOpen = input<TanStackRouterDevtoolsOptions['initialIsOpen']>()
  panelProps = input<TanStackRouterDevtoolsOptions['panelProps']>()
  closeButtonProps = input<TanStackRouterDevtoolsOptions['closeButtonProps']>()
  toggleButtonProps =
    input<TanStackRouterDevtoolsOptions['toggleButtonProps']>()
  position = input<TanStackRouterDevtoolsOptions['position']>()
  containerElement = input<TanStackRouterDevtoolsOptions['containerElement']>()
  inputRouter = input<TanStackRouterDevtoolsOptions['router']>(undefined, {
    alias: 'router',
  })
  shadowDOMTarget = input<TanStackRouterDevtoolsOptions['shadowDOMTarget']>()

  private elementRef = inject(ElementRef<HTMLElement>)

  constructor() {
    const platformId = inject(PLATFORM_ID)
    if (!isPlatformBrowser(platformId)) return

    const contextRouter = injectRouter({ warn: false })
    const router = computed(() => this.inputRouter() ?? contextRouter)
    const routerState = injectStore(() => router().stores.__store)

    const devtoolsSignal = computed(() =>
      untracked(() => {
        return new TanStackRouterDevtoolsCore({
          initialIsOpen: this.initialIsOpen(),
          panelProps: this.panelProps(),
          closeButtonProps: this.closeButtonProps(),
          toggleButtonProps: this.toggleButtonProps(),
          position: this.position(),
          containerElement: this.containerElement(),
          shadowDOMTarget: this.shadowDOMTarget(),
          router: router(),
          routerState: routerState(),
        })
      }),
    )

    effect(() => {
      devtoolsSignal().setRouter(router())
    })

    effect(() => {
      devtoolsSignal().setOptions({
        initialIsOpen: this.initialIsOpen(),
        panelProps: this.panelProps(),
        closeButtonProps: this.closeButtonProps(),
        toggleButtonProps: this.toggleButtonProps(),
        position: this.position(),
        containerElement: this.containerElement(),
        shadowDOMTarget: this.shadowDOMTarget(),
      })
    })

    const destroyRef = inject(DestroyRef)
    afterNextRender(() => {
      devtoolsSignal().mount(this.elementRef.nativeElement)
      destroyRef.onDestroy(() => {
        devtoolsSignal().unmount()
      })
    })
  }
}
