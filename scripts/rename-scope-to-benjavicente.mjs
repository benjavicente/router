/**
 * Renames workspace package scope from @tanstack to @benjavicente.
 * Only replaces full package names that appear as a "name" field in some
 * package.json under the repo (so @tanstack/react-query etc. stay untouched).
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

const SKIP_DIR_NAMES = new Set([
  'node_modules',
  '.git',
  'dist',
  '.nx',
  'coverage',
  '.turbo',
  '.pnpm-store',
])

/** @param {string} dir */
function collectPackageJsonFiles(dir, out = []) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const ent of entries) {
    if (SKIP_DIR_NAMES.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      collectPackageJsonFiles(full, out)
    } else if (ent.name === 'package.json') {
      out.push(full)
    }
  }
  return out
}

const packageJsonPaths = collectPackageJsonFiles(ROOT)
const internalNames = new Set()
for (const pj of packageJsonPaths) {
  try {
    const j = JSON.parse(fs.readFileSync(pj, 'utf8'))
    if (typeof j.name === 'string' && j.name.startsWith('@tanstack/')) {
      internalNames.add(j.name)
    }
  } catch {
    /* skip */
  }
}

const sorted = [...internalNames].sort((a, b) => b.length - a.length)
const replacements = sorted.map((from) => ({
  from,
  to: from.replace(/^@tanstack\//, '@benjavicente/'),
}))

console.log(`${replacements.length} workspace package names to rewrite`)

const TEXT_FILE_RE =
  /\.(json|ts|tsx|js|mjs|cjs|mts|cts|vue|md|mdx|yaml|yml|toml|html)$/i

/** @param {string} dir */
function* walkTextFiles(dir) {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const ent of entries) {
    if (SKIP_DIR_NAMES.has(ent.name)) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      yield* walkTextFiles(full)
    } else if (
      ent.name === 'pnpm-lock.yaml' ||
      TEXT_FILE_RE.test(ent.name)
    ) {
      yield full
    }
  }
}

let filesChanged = 0
for (const file of walkTextFiles(ROOT)) {
  let s = fs.readFileSync(file, 'utf8')
  const orig = s
  for (const { from, to } of replacements) {
    if (s.includes(from)) {
      s = s.split(from).join(to)
    }
  }
  if (s !== orig) {
    fs.writeFileSync(file, s)
    filesChanged++
  }
}

console.log(`Updated ${filesChanged} files`)
