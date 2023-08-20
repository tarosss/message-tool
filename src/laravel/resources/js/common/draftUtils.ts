import { oneOrMore } from './regularExpression'
import { deepCopy } from './objectUtils'

export const validDraft = (draft: Draft): boolean => 
  oneOrMore(draft.message) && draft.files.filter((file) => file.sended === 0).length >= 0

export const getPostDraft = (draft: Draft): Draft => {
  const d = deepCopy<Draft>(draft)
  d.files = draft.files.filter((f) => f.sended === 0)
  return d
}
