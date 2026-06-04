import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@benjavicente/react-start/client'

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  )
})
