import { oneOrMore } from './regularExpression'
import { deepCopy } from './objectUtils'

export const validDraft = (draft: Draft): boolean => {
  if (oneOrMore(draft.message)) {
    return true
  }

  const values = Object.values(draft.files)
  if (values.length === 0) {
    // メッセージだけの編集はfetchを実行する
    return true
  }

  for (const draftFile of values) {
    if (draftFile.sended === 0) {
      return true
    }
  }

  return false
}

export const getPostDraft = (draft: Draft): Draft => {
  const d = deepCopy<Draft>(draft)
  const files: {
    [originalFileName in string]: DraftFile
  } = {}

  for (const [originalFileName, draftFile] of Object.entries(draft.files)) {
    if (draftFile.sended === 0) {
      // 未送信のファイルのみ
      files[originalFileName] = draftFile
    }
  }

  d.files = files

  return d
}
