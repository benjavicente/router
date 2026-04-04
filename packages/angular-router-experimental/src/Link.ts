import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core'
import {
  AnyRouter,
  LinkOptions as CoreLinkOptions,
  RegisteredRouter,
  RoutePaths,
  deepEqual,
  exactPathTest,
  preloadWarning,
  removeTrailingSlash,
} from '@tanstack/router-core'
import { injectLocation } from './injectLocation'
import { injectRouter } from './injectRouter'
import { injectIntersectionObserver } from './injectIntersectionObserver'

@Directive({
  selector: 'a[link]',
  exportAs: 'link',
  standalone: true,
  host: {
    '[href]': 'hrefOption()?.href',
    '(click)': 'handleClick($event)',
    '(focus)': 'handleFocus()',
    '(mouseenter)': 'handleEnter($event)',
    '(mouseover)': 'handleEnter($event)',
    '(mouseleave)': 'handleLeave($event)',
    '[attr.target]': 'target()',
    '[attr.role]': 'disabled() ? "link" : undefined',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.data-status]': 'isActive() ? "active" : undefined',
    '[attr.aria-current]': 'isActive() ? "page" : undefined',
    '[attr.data-transitioning]':
      'isTransitioning() ? "transitioning" : undefined',
    '[class]': 'isActiveProps()?.class',
    '[style]': 'isActiveProps()?.style',
  },
})
export class Link<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends RoutePaths<TRouter['routeTree']> | string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom,
  TMaskTo extends string = '.',
> {
  passiveEvents = injectPasiveEvents(() => ({
    touchstart: this.handleTouchStart,
  }))

  options = input.required<
    LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>
  >({ alias: 'link' })

  protected router = injectRouter()
  protected isTransitioning = signal(false)

  protected from = computed(() =>
    untracked(() => this.options().from),
  )

  protected disabled = computed(() => this._options().disabled ?? false)
  protected target = computed(() => this._options().target)

  protected _options = computed<
    LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>
  >(() => {
    return {
      ...this.options(),
      from: this.from(),
    }
  })

  protected nextLocation = computed(() => {
    const currentLocation = this.location()
    return this.router.buildLocation({
      _fromLocation: currentLocation,
      ...this._options(),
    } as any)
  })

  protected hrefOption = computed(() => {
    if (this._options().disabled) {
      return undefined
    }

    const location = this.nextLocation().maskedLocation ?? this.nextLocation()
    const external = location.external
    const href = external
      ? location.publicHref
      : this.router.history.createHref(location.publicHref) || '/'

    return { href, external }
  })

  protected externalLink = computed(() => {
    const hrefOption = this.hrefOption()
    if (hrefOption?.external) {
      return hrefOption.href
    }
    try {
      new URL(this.options()['to'] as any)
      return this.options()['to']
    } catch { }
    return undefined
  })

  protected preload = computed(() => {
    if (this.options()['reloadDocument']) {
      return false
    }
    return this.options()['preload'] ?? this.router.options.defaultPreload
  })

  protected preloadDelay = computed(() => {
    return (
      this.options()['preloadDelay'] ??
      this.router.options.defaultPreloadDelay ??
      0
    )
  })

  protected location = injectLocation<TRouter>()

  protected isActiveProps = computed(() => {
    const opts = this.options()
    const isActive = this.isActive()
    const props = isActive ? opts.activeProps : opts.inactiveProps
    if (!props || typeof props !== 'object') return undefined
    return props
  })

  protected isActive = computed(() => {
    if (this.externalLink()) return false

    const options = this.options()
    const activeOptions = options.activeOptions

    if (activeOptions?.exact) {
      const testExact = exactPathTest(
        this.location().pathname,
        this.nextLocation().pathname,
        this.router.basepath,
      )
      if (!testExact) {
        return false
      }
    } else {
      const currentPathSplit = removeTrailingSlash(
        this.location().pathname,
        this.router.basepath,
      )
      const nextPathSplit = removeTrailingSlash(
        this.nextLocation().pathname,
        this.router.basepath,
      )

      const pathIsFuzzyEqual =
        currentPathSplit.startsWith(nextPathSplit) &&
        (currentPathSplit.length === nextPathSplit.length ||
          currentPathSplit[nextPathSplit.length] === '/')

      if (!pathIsFuzzyEqual) {
        return false
      }
    }

    if (activeOptions?.includeSearch ?? true) {
      const searchTest = deepEqual(
        this.location().search,
        this.nextLocation().search,
        {
          partial: !activeOptions?.exact,
          ignoreUndefined: !activeOptions?.explicitUndefined,
        },
      )
      if (!searchTest) {
        return false
      }
    }

    if (activeOptions?.includeHash) {
      return this.location().hash === this.nextLocation().hash
    }
    return true
  })

  protected doPreload = () => {
    this.router.preloadRoute(this.options() as any).catch((err: any) => {
      console.warn(err)
      console.warn(preloadWarning)
    })
  }

  protected preloadViewportIoCallback = (
    entry: IntersectionObserverEntry | undefined,
  ) => {
    if (entry?.isIntersecting) {
      this.doPreload()
    }
  }

  private viewportPreloader = injectIntersectionObserver(
    this.preloadViewportIoCallback,
    { rootMargin: '100px' },
    () => !!this._options().disabled || !(this.preload() === 'viewport'),
  )

  private hasRenderFetched = false
  private rendererPreloader = effect(() => {
    if (this.hasRenderFetched) return

    if (!this._options().disabled && this.preload() === 'render') {
      this.doPreload()
      this.hasRenderFetched = true
    }
  })

  protected handleClick = (event: MouseEvent) => {
    const elementTarget = (
      event.currentTarget as HTMLAnchorElement | SVGAElement
    ).getAttribute('target')
    const target = this._options().target
    const effectiveTarget = target !== undefined ? target : elementTarget

    if (
      !this._options().disabled &&
      !isCtrlEvent(event) &&
      !event.defaultPrevented &&
      (!effectiveTarget || effectiveTarget === '_self') &&
      event.button === 0
    ) {
      event.preventDefault()

      this.isTransitioning.set(true)

      const unsub = this.router.subscribe('onResolved', () => {
        unsub()
        this.isTransitioning.set(false)
      })

      this.router.navigate(this._options())
    }
  }

  protected handleFocus = () => {
    if (this._options().disabled) return
    if (this.preload()) {
      this.doPreload()
    }
  }

  protected handleTouchStart = () => {
    if (this._options().disabled) return
    if (this.preload()) {
      this.doPreload()
    }
  }

  protected handleEnter = (event: MouseEvent) => {
    if (this._options().disabled) return
    const eventTarget = (event.currentTarget || {}) as EventTargetWithPreloadTimeout

    if (this.preload()) {
      if (eventTarget.preloadTimeout) {
        return
      }

      eventTarget.preloadTimeout = setTimeout(() => {
        eventTarget.preloadTimeout = null
        this.doPreload()
      }, this.preloadDelay())
    }
  }

  protected handleLeave = (event: MouseEvent) => {
    if (this._options().disabled) return
    const eventTarget = (event.currentTarget || {}) as EventTargetWithPreloadTimeout

    if (eventTarget.preloadTimeout) {
      clearTimeout(eventTarget.preloadTimeout)
      eventTarget.preloadTimeout = null
    }
  }
}

interface ActiveLinkProps {
  class?: string
  style?: string
}

interface ActiveLinkOptionProps {
  activeProps?: ActiveLinkProps
  inactiveProps?: ActiveLinkProps
}

type EventTargetWithPreloadTimeout = EventTarget & {
  preloadTimeout?: ReturnType<typeof setTimeout> | null
}

export type LinkOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends RoutePaths<TRouter['routeTree']> | string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom,
  TMaskTo extends string = '.',
> = CoreLinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> &
  ActiveLinkOptionProps

function isCtrlEvent(e: MouseEvent) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}

// Angular does not provide by default passive events listeners
// to some events like React, and does not support a pasive options
// in the template, so we attach the pasive events manually here

type PassiveEvents = {
  touchstart: (event: TouchEvent) => void
}

function injectPasiveEvents(passiveEvents: () => PassiveEvents) {
  const element = inject(ElementRef).nativeElement
  const destroyRef = inject(DestroyRef)
  const renderer = inject(Renderer2)
  const cleanups: Array<() => void> = []

  afterNextRender(() => {
    for (const [event, handler] of Object.entries(passiveEvents())) {
      const cleanup = renderer.listen(element, event, handler, {
        passive: true,
      })
      cleanups.push(cleanup)
    }
  })

  destroyRef.onDestroy(() => {
    while (cleanups.length) {
      cleanups.pop()?.()
    }
  })
}
