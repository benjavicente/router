import '@angular/compiler'
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed'
import { TestBed } from '@angular/core/testing'
import { afterEach, vi } from 'vitest'

setupTestBed()

afterEach(() => {
  TestBed.resetTestingModule()
})

// Mock window.scrollTo to silence errors in tests
window.scrollTo = vi.fn()
