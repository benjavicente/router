import {
  DestroyRef,
  Injector,
  ViewContainerRef,
  effect,
  inject,
  inputBinding,
} from '@angular/core'
import type { Provider, Type } from '@angular/core'

export type RenderValue = {
  key?: string
  component: Type<any> | null | undefined
  inputs?: Record<string, () => unknown>
  providers?: Array<Provider>
} | null | undefined

export function injectRender(renderValueFn: () => RenderValue): void {
  const vcr = inject(ViewContainerRef)
  const parent = inject(Injector)

  inject(DestroyRef).onDestroy(() => {
    vcr.clear()
  })

  let lastKey: Array<any> = []

  effect(() => {
    const renderValue = renderValueFn()

    const newKey = resolvedKey(renderValue)
    if (keysAreEqual(lastKey, newKey)) return

    if (lastKey.length > 0) vcr.clear()

    lastKey = newKey

    const component = renderValue?.component
    if (!component) return

    const providers = renderValue.providers ?? []
    const childInjector = Injector.create({ providers, parent })
    const bindings = Object.entries(renderValue.inputs ?? {}).map(([name, value]) =>
      inputBinding(name, value),
    )
    const cmpRef = vcr.createComponent(component, { injector: childInjector, bindings })
    cmpRef.changeDetectorRef.markForCheck()
  })
}

function resolvedKey(value: RenderValue) {
  const component = value?.component
  if (!value || !component) return []
  return [component, value.key]
}

function keysAreEqual(a: Array<any>, b: Array<any>) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
