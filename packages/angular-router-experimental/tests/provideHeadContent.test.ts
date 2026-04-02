import * as Angular from '@angular/core'
import { render, waitFor } from '@testing-library/angular'
import { afterEach, describe, expect, test } from 'vitest'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  provideHeadContent,
  provideTanstackRouter,
} from '../src'
import { buildManagedDocumentContent } from '../src/provideHeadContent'

afterEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  document.title = ''
})

@Angular.Component({
  selector: 'tsr-head-content-test',
  standalone: true,
  imports: [RouterProvider],
  template: '<router-provider />',
})
class TestAppComponent {}

@Angular.Component({
  standalone: true,
  imports: [Outlet],
  template: '<div data-testid="root-route">root</div><outlet />',
})
class RootRouteComponent {}

function makeRouter() {
  const rootRoute = createRootRoute({
    head: () => ({
      meta: [
        { title: 'Root title' },
        { name: 'description', content: 'Root description' },
        { property: 'og:image', content: 'root-image.jpg' },
      ],
      links: [{ rel: 'stylesheet', href: '/root.css' }],
      scripts: [{ src: '/head-root.js' }],
      styles: [{ children: 'body{color:red;}' }],
    }),
    scripts: () => [{ src: '/body-root.js' }, undefined],
    component: () => RootRouteComponent,
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    head: () => ({
      meta: [
        { title: 'Index title' },
        { name: 'description', content: 'Index description' },
        { name: 'last-modified', content: '2025-10-10' },
      ],
      links: [{ rel: 'canonical', href: '/' }],
      scripts: [{ src: '/head-index.js' }],
    }),
    scripts: () => [{ src: '/body-index.js' }],
  })

  const postsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/posts',
    head: () => ({
      meta: [
        { title: 'Posts title' },
        { name: 'description', content: 'Posts description' },
        { property: 'og:image', content: 'posts-image.jpg' },
      ],
      links: [{ rel: 'canonical', href: '/posts' }],
      scripts: [{ src: '/head-posts.js' }],
    }),
    scripts: () => [{ src: '/body-posts.js' }],
  })

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, postsRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
    ssr: {
      nonce: 'test-nonce',
    },
  })

  router.ssr = {
    manifest: {
      routes: {
        __root__: {
          preloads: ['/assets/root.preload.js'],
          assets: [
            {
              tag: 'link',
              attrs: {
                rel: 'modulepreload',
                href: '/assets/root.manifest.css',
              },
            },
            {
              tag: 'script',
              attrs: {
                src: '/assets/root.manifest.js',
              },
            },
          ],
        },
        '/': {
          preloads: ['/assets/index.preload.js'],
          assets: [
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: '/assets/index.manifest.css',
              },
            },
            {
              tag: 'script',
              attrs: {
                src: '/assets/index.manifest.js',
              },
            },
          ],
        },
        '/posts': {
          preloads: ['/assets/posts.preload.js'],
          assets: [
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: '/assets/posts.manifest.css',
              },
            },
            {
              tag: 'script',
              attrs: {
                src: '/assets/posts.manifest.js',
              },
            },
          ],
        },
      },
    },
  }

  return router
}

describe('buildManagedDocumentContent', () => {
  test('derives title, dedupes meta, and includes nonce/manifest tags', async () => {
    const router = makeRouter()
    router.serverSsr = {
      takeBufferedScripts: () => ({
        tag: 'script',
        attrs: {
          id: 'tsr-buffered',
        },
        children: 'console.log("buffered")',
      }),
    } as any

    await router.load()

    const content = buildManagedDocumentContent(router)

    expect(content.title).toBe('Index title')
    expect(content.head).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: 'meta',
          attrs: expect.objectContaining({
            name: 'description',
            content: 'Index description',
            nonce: 'test-nonce',
          }),
        }),
        expect.objectContaining({
          tag: 'meta',
          attrs: expect.objectContaining({
            property: 'csp-nonce',
            content: 'test-nonce',
          }),
        }),
        expect.objectContaining({
          tag: 'link',
          attrs: expect.objectContaining({
            rel: 'modulepreload',
            href: '/assets/root.preload.js',
          }),
        }),
        expect.objectContaining({
          tag: 'link',
          attrs: expect.objectContaining({
            href: '/assets/index.manifest.css',
          }),
        }),
        expect.objectContaining({
          tag: 'style',
          children: 'body{color:red;}',
        }),
        expect.objectContaining({
          tag: 'script',
          attrs: expect.objectContaining({
            src: '/head-index.js',
          }),
        }),
      ]),
    )

    expect(
      content.head.filter(
        (tag) => tag.tag === 'meta' && tag.attrs?.name === 'description',
      ),
    ).toHaveLength(1)

    expect(content.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: 'script',
          attrs: expect.objectContaining({ id: 'tsr-buffered' }),
          children: 'console.log("buffered")',
        }),
        expect.objectContaining({
          tag: 'script',
          attrs: expect.objectContaining({
            src: '/body-root.js',
            nonce: 'test-nonce',
          }),
        }),
        expect.objectContaining({
          tag: 'script',
          attrs: expect.objectContaining({
            src: '/assets/index.manifest.js',
            nonce: 'test-nonce',
          }),
        }),
      ]),
    )

    const descriptionMeta = content.head.find(
      (tag) => tag.tag === 'meta' && tag.attrs?.name === 'description',
    )
    const descriptionMetaAgain = buildManagedDocumentContent(router).head.find(
      (tag) => tag.tag === 'meta' && tag.attrs?.name === 'description',
    )

    expect(descriptionMeta?.id).toMatch(/^tsr-[a-z0-9]+$/)
    expect(descriptionMeta?.id.length).toBeLessThan(24)
    expect(descriptionMeta?.id).toBe(descriptionMetaAgain?.id)
  })
})

describe('provideHeadContent', () => {
  test('installs as an app provider and only updates changed managed nodes', async () => {
    document.head.innerHTML =
      '<meta name="unmanaged" content="keep-me"><title>Initial title</title>'
    document.body.innerHTML = ''

    const router = makeRouter()
    await router.load()

    await render(TestAppComponent, {
      providers: [provideTanstackRouter({ router }), provideHeadContent(router)],
    })

    await waitFor(() => {
      expect(document.title).toBe('Index title')
      expect(
        document.head.querySelector(
          'meta[name="description"][content="Index description"]',
        ),
      ).toBeTruthy()
      expect(
        document.head.querySelector(
          'script[src="/head-index.js"][data-tsr-managed="head"]',
        ),
      ).toBeTruthy()
      expect(
        document.body.querySelector(
          'script[src="/body-index.js"][data-tsr-managed="body"]',
        ),
      ).toBeTruthy()
    })

    const headRootScript = document.head.querySelector(
      'script[src="/head-root.js"][data-tsr-managed="head"]',
    )
    const headIndexScript = document.head.querySelector(
      'script[src="/head-index.js"][data-tsr-managed="head"]',
    )
    const rootStylesheet = document.head.querySelector(
      'link[href="/root.css"][data-tsr-managed="head"]',
    )
    const bodyRootScript = document.body.querySelector(
      'script[src="/body-root.js"][data-tsr-managed="body"]',
    )
    const bodyIndexScript = document.body.querySelector(
      'script[src="/body-index.js"][data-tsr-managed="body"]',
    )
    const descriptionMeta = document.head.querySelector(
      'meta[name="description"][content="Index description"]',
    )

    expect(headRootScript?.getAttribute('data-tsr-id')).toMatch(/^tsr-[a-z0-9]+$/)
    expect(headRootScript?.hasAttribute('data-tsr-key')).toBe(false)
    expect(headRootScript?.getAttribute('data-tsr-id')?.length).toBeLessThan(24)

    expect(
      document.head.querySelector('meta[name="unmanaged"][content="keep-me"]'),
    ).toBeTruthy()

    const unmanagedScript = document.createElement('script')
    unmanagedScript.setAttribute('src', '/unmanaged.js')
    document.body.appendChild(unmanagedScript)

    expect(document.body.querySelector('script[src="/unmanaged.js"]')).toBeTruthy()
    expect(
      document.head.querySelectorAll('script[src="/head-index.js"]').length,
    ).toBe(1)
    expect(
      document.body.querySelectorAll('script[src="/body-index.js"]').length,
    ).toBe(1)

    await router.invalidate()

    await waitFor(() => {
      expect(
        document.head.querySelectorAll('script[src="/head-index.js"]').length,
      ).toBe(1)
      expect(
        document.body.querySelectorAll('script[src="/body-index.js"]').length,
      ).toBe(1)
    })

    expect(
      document.head.querySelector('script[src="/head-root.js"][data-tsr-managed="head"]'),
    ).toBe(headRootScript)
    expect(
      document.head.querySelector('script[src="/head-index.js"][data-tsr-managed="head"]'),
    ).toBe(headIndexScript)
    expect(
      document.head.querySelector('link[href="/root.css"][data-tsr-managed="head"]'),
    ).toBe(rootStylesheet)
    expect(
      document.body.querySelector('script[src="/body-root.js"][data-tsr-managed="body"]'),
    ).toBe(bodyRootScript)
    expect(
      document.body.querySelector('script[src="/body-index.js"][data-tsr-managed="body"]'),
    ).toBe(bodyIndexScript)
    expect(
      document.head.querySelector(
        'meta[name="description"][content="Index description"]',
      ),
    ).toBe(descriptionMeta)

    await router.navigate({ to: '/posts' })

    await waitFor(() => {
      expect(document.title).toBe('Posts title')
      expect(
        document.head.querySelector(
          'meta[name="description"][content="Posts description"]',
        ),
      ).toBeTruthy()
      expect(
        document.head.querySelector(
          'script[src="/head-posts.js"][data-tsr-managed="head"]',
        ),
      ).toBeTruthy()
      expect(
        document.body.querySelector(
          'script[src="/body-posts.js"][data-tsr-managed="body"]',
        ),
      ).toBeTruthy()
    })

    const nextDescriptionMeta = document.head.querySelector(
      'meta[name="description"][content="Posts description"]',
    )

    expect(nextDescriptionMeta).toBeTruthy()
    expect(nextDescriptionMeta).not.toBe(descriptionMeta)
    expect(
      document.head.querySelector('script[src="/head-root.js"][data-tsr-managed="head"]'),
    ).toBe(headRootScript)
    expect(
      document.head.querySelector('link[href="/root.css"][data-tsr-managed="head"]'),
    ).toBe(rootStylesheet)
    expect(
      document.body.querySelector('script[src="/body-root.js"][data-tsr-managed="body"]'),
    ).toBe(bodyRootScript)

    expect(
      document.head.querySelector(
        'meta[name="description"][content="Index description"]',
      ),
    ).toBeFalsy()
    expect(
      document.head.querySelector('script[src="/head-index.js"][data-tsr-managed="head"]'),
    ).toBeFalsy()
    expect(
      document.body.querySelector('script[src="/body-index.js"][data-tsr-managed="body"]'),
    ).toBeFalsy()
  })
})
