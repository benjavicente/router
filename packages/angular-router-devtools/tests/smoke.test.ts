import { expect, test } from 'vitest'

test('package entry is loadable', async () => {
  const mod = await import('../src/index')
  expect(mod).toBeDefined()
})
