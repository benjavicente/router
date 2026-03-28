import type { CompileStartFrameworkOptions } from './types'

export function getStartPackageName(
  framework: CompileStartFrameworkOptions,
): string {
  return framework === 'angular'
    ? '@tanstack/angular-start-experimental'
    : `@tanstack/${framework}-start`
}

export function getRouterPackageName(
  framework: CompileStartFrameworkOptions,
): string {
  return framework === 'angular'
    ? '@tanstack/angular-router-experimental'
    : `@tanstack/${framework}-router`
}
