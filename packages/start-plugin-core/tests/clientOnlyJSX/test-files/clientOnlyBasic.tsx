import { ClientOnly } from '@benjavicente/react-router'
import { Chart } from 'heavy-chart-library'
import { formatData } from './utils'

export function MyComponent() {
  return (
    <div>
      <ClientOnly fallback={<div>Loading...</div>}>
        <Chart data={formatData()} />
      </ClientOnly>
    </div>
  )
}
