import { e2eStopDummyServer } from '@benjavicente/router-e2e-utils'
import packageJson from '../../package.json' with { type: 'json' }

export default async function teardown() {
  await e2eStopDummyServer(packageJson.name)
}

