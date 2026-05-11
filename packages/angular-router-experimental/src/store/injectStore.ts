import { injectSelector } from './injectSelector'
import type { CreateSignalOptions, Injector, Signal } from '@angular/core'
import type { SelectionSource } from './injectSelector'

type CompatibilityInjectStoreOptions<TSelected> =
  CreateSignalOptions<TSelected> & {
    injector?: Injector
  }

export function injectStore<TState, TSelected = NoInfer<TState>>(
  store: SelectionSource<TState>,
  selector?: (state: NoInfer<TState>) => TSelected,
  options?: CompatibilityInjectStoreOptions<TSelected>,
): Signal<TSelected>
export function injectStore<TState, TSelected = NoInfer<TState>>(
  store: SelectionSource<TState> | (() => SelectionSource<TState>),
  selector?: (state: NoInfer<TState>) => TSelected,
  options?: CompatibilityInjectStoreOptions<TSelected>,
): Signal<TSelected>
export function injectStore<TState, TSelected = NoInfer<TState>>(
  store: SelectionSource<TState> | (() => SelectionSource<TState>),
  selector: (state: NoInfer<TState>) => TSelected = (d) =>
    d as unknown as TSelected,
  options?: CompatibilityInjectStoreOptions<TSelected>,
): Signal<TSelected> {
  const { equal, injector, ...signalOptions } = options ?? {}

  return injectSelector(store, selector, {
    ...signalOptions,
    compare: equal,
    injector,
  })
}
