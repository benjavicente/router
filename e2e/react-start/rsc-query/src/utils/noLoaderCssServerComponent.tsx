import { createServerFn } from '@benjavicente/react-start'
import { renderServerComponent } from '@benjavicente/react-start/rsc'
import { CssModulesContent } from './CssModulesContent'

export const getNoLoaderCssServerComponent = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { title?: string; delayMs?: number }) => data)
  .handler(async ({ data }) => {
    await new Promise((resolve) => setTimeout(resolve, data.delayMs ?? 150))

    return renderServerComponent(
      <>
        {import.meta.viteRsc.loadCss()}
        <CssModulesContent data={{ title: data.title }} />
      </>,
    )
  })
