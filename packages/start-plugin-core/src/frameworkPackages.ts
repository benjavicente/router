import type { CompileStartFrameworkOptions } from './types'

export function getStartPackageName(
  framework: CompileStartFrameworkOptions,
): string {
  return framework === 'angular'
    ? '@benjavicente/angular-start-experimental'
    : `@benjavicente/${framework}-start`
}

export function getRouterPackageName(
  framework: CompileStartFrameworkOptions,
): string {
  return framework === 'angular'
    ? '@benjavicente/angular-router-experimental'
    : `@benjavicente/${framework}-router`
}
