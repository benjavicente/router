# @benjavicente/react-start-rsc

## 0.0.44

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.169.20

## 0.0.43

### Patch Changes

- Updated dependencies [[`35e88f0`](https://github.com/TanStack/router/commit/35e88f04996d71019a1868b7b06ecb4ddbc9df9e)]:
  - @benjavicente/router-core@1.169.2
  - @benjavicente/start-client-core@1.168.2
  - @benjavicente/start-plugin-core@1.169.19
  - @benjavicente/start-server-core@1.167.30
  - @benjavicente/react-router@1.169.2
  - @benjavicente/react-start-server@1.166.52
  - @benjavicente/start-storage-context@1.166.35

## 0.0.42

### Patch Changes

- Updated dependencies [[`056337e`](https://github.com/TanStack/router/commit/056337ef02ccbeaf45ec8533a227761be869e8f3)]:
  - @benjavicente/router-utils@1.161.8
  - @benjavicente/start-plugin-core@1.169.18

## 0.0.41

### Patch Changes

- Updated dependencies [[`afa40ef`](https://github.com/TanStack/router/commit/afa40ef46c273c53646ba33f607fc618a07ffede)]:
  - @benjavicente/start-server-core@1.167.29
  - @benjavicente/react-start-server@1.166.51
  - @benjavicente/start-plugin-core@1.169.17

## 0.0.40

### Patch Changes

- Updated dependencies [[`709627f`](https://github.com/TanStack/router/commit/709627f3dbc6d97daa547a1401ef42a53bc4be32)]:
  - @benjavicente/start-server-core@1.167.28
  - @benjavicente/react-start-server@1.166.50
  - @benjavicente/start-plugin-core@1.169.16

## 0.0.39

### Patch Changes

- Updated dependencies [[`238ea4a`](https://github.com/TanStack/router/commit/238ea4a4998ab3a7fd528b317e1935766ac65df8)]:
  - @benjavicente/start-server-core@1.167.27
  - @benjavicente/react-start-server@1.166.49
  - @benjavicente/start-plugin-core@1.169.15

## 0.0.38

### Patch Changes

- Updated dependencies [[`96818b8`](https://github.com/TanStack/router/commit/96818b8ba5ead6f1f027094841330182aff415b2)]:
  - @benjavicente/start-plugin-core@1.169.14

## 0.0.37

### Patch Changes

- Add compiler-driven RSC CSS auto-injection for Start RSC render APIs and wire it into the React Start Vite and Rsbuild adapters. This ensures same-file CSS module dependencies are discovered for `renderServerComponent`, `createCompositeComponent`, and JSX-based `renderToReadableStream` calls. ([#7310](https://github.com/TanStack/router/pull/7310))

  Also add a configurable server function provider module directive hook used by the React Rsbuild RSC adapter to emit `"use server-entry"` only for extracted provider files.

- Updated dependencies [[`ae453b7`](https://github.com/TanStack/router/commit/ae453b78624cac1b574f0d1efbfbf6ca03922c6c)]:
  - @benjavicente/start-plugin-core@1.169.13

## 0.0.36

### Patch Changes

- Updated dependencies [[`4a1e63f`](https://github.com/TanStack/router/commit/4a1e63f1d1230b1ed8234609acad4639d8982c13)]:
  - @benjavicente/router-core@1.169.1
  - @benjavicente/react-router@1.169.1
  - @benjavicente/react-start-server@1.166.48
  - @benjavicente/start-client-core@1.168.1
  - @benjavicente/start-plugin-core@1.169.12
  - @benjavicente/start-server-core@1.167.26
  - @benjavicente/start-storage-context@1.166.34

## 0.0.35

### Patch Changes

- Updated dependencies [[`82b0613`](https://github.com/TanStack/router/commit/82b06132af776f74603ab27977cc277d6219a845)]:
  - @benjavicente/start-client-core@1.168.0
  - @benjavicente/react-start-server@1.166.47
  - @benjavicente/start-plugin-core@1.169.11
  - @benjavicente/start-server-core@1.167.25

## 0.0.34

### Patch Changes

- Updated dependencies [[`c4256c2`](https://github.com/TanStack/router/commit/c4256c2c857f392d2031cf87821e4c36a92d0382)]:
  - @benjavicente/start-plugin-core@1.169.10

## 0.0.33

### Patch Changes

- Updated dependencies [[`761fcc0`](https://github.com/TanStack/router/commit/761fcc0c96dd96721b533a1fd9e2c972f222ef94)]:
  - @benjavicente/start-plugin-core@1.169.9

## 0.0.32

### Patch Changes

- Updated dependencies [[`c992495`](https://github.com/TanStack/router/commit/c992495bf4010ff4c3597bb1f3b1ba02594e857e)]:
  - @benjavicente/router-core@1.169.0
  - @benjavicente/react-router@1.169.0
  - @benjavicente/react-start-server@1.166.46
  - @benjavicente/start-client-core@1.167.22
  - @benjavicente/start-plugin-core@1.169.8
  - @benjavicente/start-server-core@1.167.24
  - @benjavicente/start-storage-context@1.166.33

## 0.0.31

### Patch Changes

- Updated dependencies [[`b5c4183`](https://github.com/TanStack/router/commit/b5c4183ab8b44be8a75647b7f7b588ad7c146ece)]:
  - @benjavicente/router-core@1.168.18
  - @benjavicente/react-router@1.168.26
  - @benjavicente/react-start-server@1.166.45
  - @benjavicente/start-client-core@1.167.21
  - @benjavicente/start-plugin-core@1.169.7
  - @benjavicente/start-server-core@1.167.23
  - @benjavicente/start-storage-context@1.166.32

## 0.0.30

### Patch Changes

- Re-export `RenderableServerComponent`, `RenderableServerComponentAttributes`, `RenderableServerComponentBuilder`, and `AnyRenderableServerComponent` from the package's public entries. Without these, consumers with `declaration: true` hit TS2742 on `renderServerComponent` calls and are forced to annotate handlers as `Promise<any>`. ([#7278](https://github.com/TanStack/router/pull/7278))

## 0.0.29

### Patch Changes

- Updated dependencies [[`493148b`](https://github.com/TanStack/router/commit/493148bc5378b7f9de1544d87f6aaa425c12eb34)]:
  - @benjavicente/router-core@1.168.17
  - @benjavicente/react-router@1.168.25
  - @benjavicente/react-start-server@1.166.44
  - @benjavicente/start-client-core@1.167.20
  - @benjavicente/start-plugin-core@1.169.6
  - @benjavicente/start-server-core@1.167.22
  - @benjavicente/start-storage-context@1.166.31

## 0.0.28

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.169.5

## 0.0.27

### Patch Changes

- Updated dependencies [[`8b97002`](https://github.com/TanStack/router/commit/8b97002af3f6d15204e60c55d3f5735b78bd7efe)]:
  - @benjavicente/start-client-core@1.167.19
  - @benjavicente/react-start-server@1.166.43
  - @benjavicente/start-plugin-core@1.169.4
  - @benjavicente/start-server-core@1.167.21

## 0.0.26

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.169.3

## 0.0.25

### Patch Changes

- Updated dependencies [[`4d864ee`](https://github.com/TanStack/router/commit/4d864eebbd184265eabb563d326ab409c93feb17)]:
  - @benjavicente/react-router@1.168.24
  - @benjavicente/router-core@1.168.16
  - @benjavicente/start-plugin-core@1.169.2
  - @benjavicente/start-server-core@1.167.20
  - @benjavicente/react-start-server@1.166.42
  - @benjavicente/start-client-core@1.167.18
  - @benjavicente/start-storage-context@1.166.30

## 0.0.24

### Patch Changes

- Updated dependencies [[`9252206`](https://github.com/TanStack/router/commit/9252206e5aeafe53e31eb7baa491d07a597c4dc6)]:
  - @benjavicente/start-plugin-core@1.169.1

## 0.0.23

### Patch Changes

- Split Start plugin core bundler APIs into explicit Vite and Rsbuild subpaths so projects only need the bundler they use. Mark both `vite` and `@rsbuild/core` peers as optional where Start exposes both integrations. ([#7249](https://github.com/TanStack/router/pull/7249))

- Updated dependencies [[`dda463c`](https://github.com/TanStack/router/commit/dda463c8b571519165d3adbc337db7a0b8be1072)]:
  - @benjavicente/start-plugin-core@1.169.0

## 0.0.22

### Patch Changes

- rsbuild ([#7228](https://github.com/TanStack/router/pull/7228))

- Updated dependencies [[`91a7089`](https://github.com/TanStack/router/commit/91a708989d00537a21911e74ff60bbfec8266295)]:
  - @benjavicente/start-plugin-core@1.168.0
  - @benjavicente/router-utils@1.161.7

## 0.0.21

### Patch Changes

- Updated dependencies [[`cd91cee`](https://github.com/TanStack/router/commit/cd91ceebb84b7b752b5ee09ac14e89ad2beb2259)]:
  - @benjavicente/react-router@1.168.23
  - @benjavicente/react-start-server@1.166.41

## 0.0.20

### Patch Changes

- Updated dependencies [[`f7f0025`](https://github.com/TanStack/router/commit/f7f00250f39cf0276a984558e5d427e9270d9635)]:
  - @benjavicente/start-plugin-core@1.167.35

## 0.0.19

### Patch Changes

- Updated dependencies [[`e30814d`](https://github.com/TanStack/router/commit/e30814d949110ff25829de44d729ead47555940a)]:
  - @benjavicente/react-router@1.168.22
  - @benjavicente/react-start-server@1.166.40

## 0.0.18

### Patch Changes

- Updated dependencies [[`16f6892`](https://github.com/TanStack/router/commit/16f6892d6b7ceadf606677c5a40e743f29163aa6)]:
  - @benjavicente/router-core@1.168.15
  - @benjavicente/react-router@1.168.21
  - @benjavicente/react-start-server@1.166.39
  - @benjavicente/start-client-core@1.167.17
  - @benjavicente/start-plugin-core@1.167.34
  - @benjavicente/start-server-core@1.167.19
  - @benjavicente/start-storage-context@1.166.29

## 0.0.17

### Patch Changes

- Updated dependencies [[`c5ad329`](https://github.com/TanStack/router/commit/c5ad32936f6adcca0c56474677b73b212498443b)]:
  - @benjavicente/react-router@1.168.20
  - @benjavicente/react-start-server@1.166.38

## 0.0.16

### Patch Changes

- Fix Start virtual module resolution in pnpm workspaces by serving the client entry through a real Vite virtual module. ([#7178](https://github.com/TanStack/router/pull/7178))

  Simplify Start virtual module handling by sharing a single `createVirtualModule` helper and collapsing internal `@benjavicente/start-plugin-core` imports to the root export surface.

- Updated dependencies [[`a581680`](https://github.com/TanStack/router/commit/a581680a27530469751b8ab419ada9ce66da4ffe)]:
  - @benjavicente/start-plugin-core@1.167.33

## 0.0.15

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.167.32

## 0.0.14

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.167.31

## 0.0.13

### Patch Changes

- Updated dependencies [[`105d056`](https://github.com/TanStack/router/commit/105d05691a247779a63e7b688aa1207cce619339)]:
  - @benjavicente/react-router@1.168.19
  - @benjavicente/start-plugin-core@1.167.30
  - @benjavicente/react-start-server@1.166.37

## 0.0.12

### Patch Changes

- Updated dependencies []:
  - @benjavicente/start-plugin-core@1.167.29

## 0.0.11

### Patch Changes

- Updated dependencies [[`0e2c900`](https://github.com/TanStack/router/commit/0e2c9003c18ae07c09969189c028f277ea562a7a)]:
  - @benjavicente/start-server-core@1.167.18
  - @benjavicente/router-core@1.168.14
  - @benjavicente/react-start-server@1.166.36
  - @benjavicente/start-plugin-core@1.167.28
  - @benjavicente/react-router@1.168.18
  - @benjavicente/start-client-core@1.167.16
  - @benjavicente/start-storage-context@1.166.28

## 0.0.10

### Patch Changes

- Updated dependencies [[`812792f`](https://github.com/TanStack/router/commit/812792fbda3caf97b300770855cf5641252f413b)]:
  - @benjavicente/router-core@1.168.13
  - @benjavicente/start-plugin-core@1.167.27
  - @benjavicente/start-server-core@1.167.17
  - @benjavicente/react-router@1.168.17
  - @benjavicente/react-start-server@1.166.35
  - @benjavicente/start-client-core@1.167.15
  - @benjavicente/start-storage-context@1.166.27

## 0.0.9

### Patch Changes

- Updated dependencies [[`8ec9ca9`](https://github.com/TanStack/router/commit/8ec9ca97b472779de878c2a6510f21deb24d386c)]:
  - @benjavicente/router-core@1.168.12
  - @benjavicente/react-router@1.168.16
  - @benjavicente/react-start-server@1.166.34
  - @benjavicente/start-client-core@1.167.14
  - @benjavicente/start-plugin-core@1.167.26
  - @benjavicente/start-server-core@1.167.16
  - @benjavicente/start-storage-context@1.166.26

## 0.0.8

### Patch Changes

- Updated dependencies [[`d3f20fb`](https://github.com/TanStack/router/commit/d3f20fbe7acf69c3bd108c5ddc9748ad47690b04)]:
  - @benjavicente/start-plugin-core@1.167.25

## 0.0.7

### Patch Changes

- Updated dependencies [[`6355bb7`](https://github.com/TanStack/router/commit/6355bb75f7637ba77f06a923c18fdaf37720bb48)]:
  - @benjavicente/start-server-core@1.167.15
  - @benjavicente/react-router@1.168.15
  - @benjavicente/router-core@1.168.11
  - @benjavicente/react-start-server@1.166.33
  - @benjavicente/start-plugin-core@1.167.24
  - @benjavicente/start-client-core@1.167.13
  - @benjavicente/start-storage-context@1.166.25

## 0.0.6

### Patch Changes

- Updated dependencies [[`459057c`](https://github.com/TanStack/router/commit/459057cd2d90cff20d20e51d4964b0a8c950555e)]:
  - @benjavicente/start-client-core@1.167.12
  - @benjavicente/start-server-core@1.167.14
  - @benjavicente/react-router@1.168.14
  - @benjavicente/router-core@1.168.10
  - @benjavicente/react-start-server@1.166.32
  - @benjavicente/start-plugin-core@1.167.23
  - @benjavicente/start-storage-context@1.166.24

## 0.0.5

### Patch Changes

- Updated dependencies [[`f8ac427`](https://github.com/TanStack/router/commit/f8ac427000c3fec99225926e72f9f2fc7a37231f)]:
  - @benjavicente/start-server-core@1.167.13
  - @benjavicente/start-client-core@1.167.11
  - @benjavicente/react-start-server@1.166.31
  - @benjavicente/start-plugin-core@1.167.22

## 0.0.4

### Patch Changes

- Updated dependencies [[`2d53c05`](https://github.com/TanStack/router/commit/2d53c056ef0b203de8a28bc92c24e8e604205d52)]:
  - @benjavicente/start-server-core@1.167.12
  - @benjavicente/start-plugin-core@1.167.21
  - @benjavicente/react-start-server@1.166.30

## 0.0.2

### Patch Changes

- Republish the React Start RSC package chain so fresh installs resolve a `start-plugin-core` build that exports the subpaths used by `react-start-rsc`. ([`3384abc`](https://github.com/TanStack/router/commit/3384abcffd98a68eb254b11221834bcbcdebec31))

- Updated dependencies [[`3384abc`](https://github.com/TanStack/router/commit/3384abcffd98a68eb254b11221834bcbcdebec31)]:
  - @benjavicente/start-plugin-core@1.167.19

## 0.0.1

### Patch Changes

- Bump the initial release line for `@benjavicente/react-start-rsc` and `@benjavicente/eslint-plugin-start` to `0.0.1` after the manual `0.0.0` publish. ([#7144](https://github.com/TanStack/router/pull/7144))
