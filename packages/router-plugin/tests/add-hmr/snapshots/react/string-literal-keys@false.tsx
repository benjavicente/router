const $$splitErrorComponentImporter = () => import('string-literal-keys.tsx?tsr-split=errorComponent');
const $$splitComponentImporter = () => import('string-literal-keys.tsx?tsr-split=component');
import { lazyRouteComponent } from '@benjavicente/react-router';
import * as React from 'react';
import { createFileRoute } from '@benjavicente/react-router';
import { fetchPosts } from '../posts';
export const Route = createFileRoute('/posts')({
  loader: fetchPosts,
  'component': lazyRouteComponent($$splitComponentImporter, 'component'),
  'errorComponent': lazyRouteComponent($$splitErrorComponentImporter, 'errorComponent')
});