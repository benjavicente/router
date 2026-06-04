const $$splitComponentImporter = () => import('chinese.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import * as React from 'react';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});
interface DemoProps {
  title: string;
}