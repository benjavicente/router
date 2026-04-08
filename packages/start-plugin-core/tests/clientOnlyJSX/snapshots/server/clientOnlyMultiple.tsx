import { ClientOnly } from '@benjavicente/react-router';
export function MyComponent() {
  return <div>
      <ClientOnly fallback={<span>Loading video...</span>} />
      <p>Some server content</p>
      <ClientOnly fallback={<span>Loading audio...</span>} />
    </div>;
}