import { useDrafts } from '../store/drafts'
import { oneOrMore } from './regularExpression'
import { deepCopy } from './objectUtils'
import { format } from './dateFormats'

type MessageType = {
  userId: string,
  channelId: string,
  threadMessageId?: string,
}
export const getDraftKey = ({ userId, threadMessageId, channelId }: MessageType) => {
  if (threadMessageId) {
    return `${userId}-${channelId}-${threadMessageId}`
  }

  return `${userId}-${channelId}`
}
// eslint-disable-next-line arrow-body-style
export const getDefaultDraft = (
  { userId, channelId, threadMessageId }: MessageType,
): Draft => {
  return {
    _id: undefined,
    user_id: userId,
    channel_id: channelId,
    thread_message_id: threadMessageId,
    draft_key: getDraftKey({ userId, channelId, threadMessageId }),
    message: '',
    files: {},
    reactions: {},
    mentions: [],
    storage: 'local',
    thread: [],
    created_at: format({ date: null, formatString: 'yyyy-MM-dd HH:mm:ss' }),

  }
}

export const getDraftData = (
  { userId, channelId, threadMessageId }: MessageType): Draft => {
  const draftKey = getDraftKey({ userId, channelId, threadMessageId })
  const { drafts } = useDrafts()
  const draft = drafts.value.get(draftKey)
  if (draft === undefined) {
    return getDefaultDraft({ userId, threadMessageId, channelId })
  }

  return deepCopy<Draft>(draft)
}

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

export const getEditorId = (
  { channelId, messageId } : { channelId: string, messageId: string | undefined },
) => {
  if (messageId) {
    return `editor-${channelId}-${messageId}`
  }

  return `editor-${channelId}`
}
