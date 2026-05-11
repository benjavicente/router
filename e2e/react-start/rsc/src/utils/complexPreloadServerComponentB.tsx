import { createServerFn } from '@benjavicente/react-start'
import { renderServerComponent } from '@benjavicente/react-start/rsc'
import { ComplexPreloadContentB } from './ComplexPreloadContentB'

// ============================================================================
// Server function that returns server component B (no children slot)
// Separate module from A so CSS is not bundled together
// ============================================================================

export const getComplexPreloadServerComponentB = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    return renderServerComponent(<ComplexPreloadContentB data={data} />)
  })
