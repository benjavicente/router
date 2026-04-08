import { e2eStartDummyServer } from '@benjavicente/router-e2e-utils'
import { getPackageName } from '../utils/getPackageName.ts'

export default async function setup() {
  await e2eStartDummyServer(getPackageName())
}
