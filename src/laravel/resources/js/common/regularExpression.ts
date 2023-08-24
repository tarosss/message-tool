/**
 * 一文字以上の文字かどうか
 */
export const oneOrMore = (s: string): boolean => {
  const p = '.'
  return new RegExp(p).test(s)
}
