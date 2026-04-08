import type { ManagedDocumentContent, ManagedTag } from './managed-document-types'

export function areManagedDocumentContentsEqual(
  prev: ManagedDocumentContent,
  next: ManagedDocumentContent,
) {
  return (
    prev.title === next.title &&
    areManagedTagArraysEqual(prev.head, next.head) &&
    areManagedTagArraysEqual(prev.body, next.body)
  )
}

export function areManagedTagArraysEqual(
  prev: Array<ManagedTag>,
  next: Array<ManagedTag>,
) {
  if (prev.length !== next.length) {
    return false
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i]?.id !== next[i]?.id) {
      return false
    }
  }

  return true
}
