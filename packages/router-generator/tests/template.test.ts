import { describe, expect, it } from 'vitest'
import { getTargetTemplate } from '../src/template'

describe('template', () => {
  it('escapes quoted route paths in React route templates', () => {
    const template = getTargetTemplate({ target: 'react' } as never)

    expect(template.route.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
    expect(template.lazyRoute.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createLazyFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
  })

  it('escapes quoted route paths in Solid route templates', () => {
    const template = getTargetTemplate({ target: 'solid' } as never)

    expect(template.route.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
    expect(template.lazyRoute.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createLazyFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
  })

  it('escapes quoted route paths in Vue route templates', () => {
    const template = getTargetTemplate({ target: 'vue' } as never)

    expect(template.route.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
    expect(template.lazyRoute.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createLazyFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
  })

  it('supports Angular route templates', () => {
    const template = getTargetTemplate({ target: 'angular' } as never)

    expect(template.fullPkg).toBe('@benjavicente/angular-router-experimental')
    expect(template.rootRoute.imports.tsrImports()).toContain('createRootRoute')
    expect(template.route.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
    expect(template.lazyRoute.imports.tsrExportStart(`/say-"hi"`)).toBe(
      `export const Route = createLazyFileRoute(${JSON.stringify('/say-"hi"')})(`,
    )
  })

  it('supports custom Angular router package route templates', () => {
    const template = getTargetTemplate({
      target: 'angular',
      angularRouterPackage: '@scope/angular-router',
    } as never)

    expect(template.fullPkg).toBe('@scope/angular-router')
    expect(template.route.imports.tsrImports()).toBe(
      "import { createFileRoute } from '@scope/angular-router';",
    )
  })
})
