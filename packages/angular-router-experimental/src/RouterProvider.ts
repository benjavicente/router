import {
  Component,
  EnvironmentInjector,
  InjectionToken,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core'
import {
  AnyRouter,
  RegisteredRouter,
  RouterOptions,
} from '@benjavicente/router-core'
import { Matches } from './Matches'
import { injectRender } from './renderer/injectRender'
import { getRouterInjectionKey } from './routerInjectionToken'
import type { InputSignal } from '@angular/core'

const CONTEXT_INPUT_INJECTION_KEY = new InjectionToken<RouterInputs['context']>(
  'CONTEXT',
  {
    providedIn: 'root',
    factory: () => ({}),
  },
)

const OPTIONS_INPUT_INJECTION_KEY = new InjectionToken<
  Omit<RouterInputs, 'router' | 'context'>
>('OPTIONS', {
  providedIn: 'root',
  factory: () => ({}),
})

export type TanstackRouterProviderOptions = {
  router: AnyRouter
  context?: RouterInputs['context']
  options?: Omit<RouterInputs, 'router' | 'context'>
}

function mergeContextWithInject(
  context: RouterInputs['context'],
): RouterInputs['context'] {
  const environmentInjector = inject(EnvironmentInjector)

  return {
    inject: environmentInjector.get.bind(environmentInjector),
    ...context,
  } as RouterInputs['context']
}

export function provideTanstackRouter({
  router,
  context,
  options,
}: TanstackRouterProviderOptions) {
  return [
    {
      provide: getRouterInjectionKey(),
      useValue: router,
    },
    {
      provide: CONTEXT_INPUT_INJECTION_KEY,
      useFactory: () => mergeContextWithInject(context ?? {}),
    },
    {
      provide: OPTIONS_INPUT_INJECTION_KEY,
      useValue: options ?? {},
    },
  ]
}

@Component({
  selector: 'router-provider,[router-provider]',
  template: '',
  standalone: true,
})
export class RouterProvider<TRouter extends AnyRouter = RegisteredRouter> {
  readonly injectedContext: RouterInputs<TRouter>['context'] = inject(
    CONTEXT_INPUT_INJECTION_KEY,
  )
  readonly injectedOptions: Omit<RouterInputs<TRouter>, 'router' | 'context'> =
    inject(OPTIONS_INPUT_INJECTION_KEY)
  readonly injectedRouter: AnyRouter | null = inject(getRouterInjectionKey(), {
    optional: true,
  })

  readonly context: InputSignal<RouterInputs<TRouter>['context']> = input<
    RouterInputs<TRouter>['context']
  >(this.injectedContext)
  readonly options: InputSignal<
    Omit<RouterInputs<TRouter>, 'router' | 'context'>
  > = input<Omit<RouterInputs<TRouter>, 'router' | 'context'>>(
    this.injectedOptions,
  )
  readonly routerInput = input<TRouter | undefined>(undefined, {
    alias: 'router',
  })

  readonly router = computed(() => {
    const inputRouter = this.routerInput()
    if (inputRouter) return inputRouter
    if (this.injectedRouter) return this.injectedRouter as TRouter
    throw new Error(
      'No router provided to <router-provider>. Provide a router with provideTanstackRouter or the router input',
    )
  })

  readonly updateRouter = effect(() => {
    const router = this.router()
    const context = this.context()
    const options = this.options()

    router.update({
      ...router.options,
      ...options,
      context: {
        ...router.options.context,
        ...context,
      },
    })
  })

  readonly render: ReturnType<typeof injectRender> = injectRender(() => {
    const router = untracked(this.router)
    return {
      component: Matches,
      providers: [
        {
          provide: getRouterInjectionKey(),
          useValue: router,
        },
      ],
    }
  })
}

type RouterInputs<
  TRouter extends AnyRouter = RegisteredRouter,
  TDehydrated extends Record<string, any> = Record<string, any>,
> = Omit<
  RouterOptions<
    TRouter['routeTree'],
    NonNullable<TRouter['options']['trailingSlash']>,
    false,
    TRouter['history'],
    TDehydrated
  >,
  'context'
> & {
  router: TRouter
  context?: Partial<
    RouterOptions<
      TRouter['routeTree'],
      NonNullable<TRouter['options']['trailingSlash']>,
      false,
      TRouter['history'],
      TDehydrated
    >['context']
  >
}
