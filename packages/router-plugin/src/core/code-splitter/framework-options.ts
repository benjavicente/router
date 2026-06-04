import { defaultCodeSplitGroupings } from '../constants'
import type { CodeSplitGroupings } from '../constants'

type FrameworkOptions = {
  package: string
  supportsLazyRouteComponent: boolean
  defaultCodeSplitGroupings: CodeSplitGroupings
  idents: {
    createFileRoute: string
    lazyFn: string
    lazyRouteComponent: string
  }
}

export function getFrameworkOptions(
  framework: string,
  angular?: { angularRouterPackage?: string },
): FrameworkOptions {
  let frameworkOptions: FrameworkOptions

  switch (framework) {
    case 'react':
      frameworkOptions = {
        package: '@benjavicente/react-router',
        supportsLazyRouteComponent: true,
        defaultCodeSplitGroupings,
        idents: {
          createFileRoute: 'createFileRoute',
          lazyFn: 'lazyFn',
          lazyRouteComponent: 'lazyRouteComponent',
        },
      }
      break
    case 'solid':
      frameworkOptions = {
        package: '@benjavicente/solid-router',
        supportsLazyRouteComponent: true,
        defaultCodeSplitGroupings,
        idents: {
          createFileRoute: 'createFileRoute',
          lazyFn: 'lazyFn',
          lazyRouteComponent: 'lazyRouteComponent',
        },
      }
      break
    case 'angular':
      frameworkOptions = {
        package:
          angular?.angularRouterPackage ??
          '@benjavicente/angular-router-experimental',
        supportsLazyRouteComponent: false,
        defaultCodeSplitGroupings: [],
        idents: {
          createFileRoute: 'createFileRoute',
          lazyFn: 'lazyFn',
          lazyRouteComponent: 'lazyRouteComponent',
        },
      }
      break
    case 'vue':
      frameworkOptions = {
        package: '@benjavicente/vue-router',
        supportsLazyRouteComponent: true,
        defaultCodeSplitGroupings,
        idents: {
          createFileRoute: 'createFileRoute',
          lazyFn: 'lazyFn',
          lazyRouteComponent: 'lazyRouteComponent',
        },
      }
      break
    default:
      throw new Error(
        `[getFrameworkOptions] - Unsupported framework: ${framework}`,
      )
  }

  return frameworkOptions
}
