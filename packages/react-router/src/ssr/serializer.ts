import type * as React from 'react'

declare module '@benjavicente/router-core' {
  export interface SerializerExtensions {
    ReadableStream: React.JSX.Element
  }
}
