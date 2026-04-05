import { e2eStartDummyServer } from '@benjavicente/router-e2e-utils'
import packageJson from '../../package.json' with { type: 'json' }

export default async function setup() {
  await e2eStartDummyServer(packageJson.name)
}

