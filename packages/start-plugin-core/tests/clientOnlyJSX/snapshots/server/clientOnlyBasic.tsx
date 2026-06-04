import { ClientOnly } from '@benjavicente/react-router';
export function MyComponent() {
  return <div>
      <ClientOnly fallback={<div>Loading...</div>} />
    </div>;
}