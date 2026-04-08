'use client';

const $$splitComponentImporter = () => import('directive-prologue.tsx?tsr-split=component---loader---notFoundComponent---pendingComponent');
import { lazyRouteComponent } from '@benjavicente/react-router';
import { createFileRoute } from '@benjavicente/react-router';
export const Route = createFileRoute('/directive')({
  component: lazyRouteComponent($$splitComponentImporter, 'component')
});