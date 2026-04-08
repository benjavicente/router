import { parseAst } from '@benjavicente/router-utils'

export type ParsedAst = ReturnType<typeof parseAst>

export function parseImportProtectionAst(code: string): ParsedAst {
  return parseAst({ code })
}
