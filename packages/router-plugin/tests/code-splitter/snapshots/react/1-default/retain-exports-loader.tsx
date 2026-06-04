const $$splitComponentImporter = () => import('retain-exports-loader.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import * as React from 'react';
import { createFileRoute } from '@benjavicente/react-router';
export function loaderFn() {
  return {
    foo: 'bar'
  };
}
export const Route = createFileRoute('/_layout')({
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: loaderFn
});
export const SIDEBAR_WIDTH = '150px';
export const SIDEBAR_MINI_WIDTH = '80px';
const ASIDE_WIDTH = '250px';