import { signal } from '@angular/core'
import type { AnyRouter } from '@tanstack/router-core'

export const routerState = signal<AnyRouter | null>(null)
