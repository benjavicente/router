import type { HistoryLocation } from '@benjavicente/history'

declare module '@benjavicente/history' {
  interface HistoryState {
    __tempLocation?: HistoryLocation
    __tempKey?: string
    __hashScrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  }
}
