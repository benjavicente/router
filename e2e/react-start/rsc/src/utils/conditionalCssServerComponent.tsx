import { createServerFn } from '@benjavicente/react-start'
import { renderServerComponent } from '@benjavicente/react-start/rsc'
import { ConditionalOrangePanel } from './ConditionalOrangePanel'
import { ConditionalVioletPanel } from './ConditionalVioletPanel'

export const getConditionalCssServerComponent = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { branch?: 'orange' | 'violet' }) => data)
  .handler(async ({ data }) => {
    const branch = data.branch === 'violet' ? 'violet' : 'orange'

    return renderServerComponent(
      <>
        {branch === 'violet' ? (
          <ConditionalVioletPanel />
        ) : (
          <ConditionalOrangePanel />
        )}
      </>,
    )
  })
