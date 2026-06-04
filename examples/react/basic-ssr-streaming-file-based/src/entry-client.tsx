import { hydrateRoot } from 'react-dom/client'
import { RouterClient } from '@benjavicente/react-router/ssr/client'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <RouterClient router={router} />)
