import { computed, ref, Ref, watch, inject } from 'vue'
import { useDropZone } from '@vueuse/core'
import { useDrafts } from '../store/drafts'
import { format } from '../common/dateFormats'
import { getFetch } from '../common/fetches';
import { deepCopy } from '../common/objectUtils';
import { draftUpdateUrl, messageStoreUrl } from '../consts/fetches'
import { Created } from '../consts/httpStatusCodes'

const formatString = 'yyyy-MM-dd HH:mm:ss'

type MessageType = {
  channelId: string,
  messageId?: string,
}

type GetDraftAttr = MessageType & {
  draftKey: string,
  userId: string,
  default?: boolean
}

const getDraftKey = ({ messageId, channelId }: MessageType) => {
  if (messageId) {
    return `${channelId}-${messageId}`
  }

  return channelId
}

const getDraftData = ({ draftKey, userId, channelId, messageId } : GetDraftAttr): Draft => {
  const { drafts } = useDrafts()
  const draft = drafts.value.get(draftKey)
  if (draft === undefined) {
    const d: Draft = {
      _id: undefined,
      draft_key: draftKey,
      message: '',
      thread: [],
      files: [],
      storage: 'local',
      user_id: userId,
      channel_id: channelId,
      thread_message_id: messageId ?? undefined,
      created_at: format({ date: null, formatString }),
    }

    return d
  }

  return deepCopy<Draft>(draft)
}

export const useMessage = ({ messageId, channelId }: MessageType) => {
  const { pushDraft, deleteDraft } = useDrafts()
  const draftKey = getDraftKey({ messageId, channelId })
  const userId = inject('loging-user-id', '')
  const token = inject('token', '')
  const storage = inject('storage', 1)
  let fetchClearTimeout = null

  // メッセージデータ関連
  const draft = ref(getDraftData({ draftKey, userId, messageId, channelId }))

  // HTML関連
  const lineHeight = 1.5
  const dropZone = ref<HTMLElement>()
  const textZone = ref<HTMLElement>()
  const textZoneHeight = ref((lineHeight * 2) + 'px')
  // ファイルのドロップ
  const droped = (dropedfiles: File[] | null) => {
    if (dropedfiles) {
      draft.value.files.push(...dropedfiles)
    }
  }

  // メッセージの投稿
  const sendMessage = async () => {
    getFetch({ token })(messageStoreUrl)
      .post({ data: [draft.value] })
      .then((res) => {
        if (res.statusCode.value !== Created) {
          // 失敗
          throw new Error()
        }
        // ドラフトのストアを削除
        deleteDraft(draftKey)
        draft.value = getDraftData({ draftKey, userId, messageId, channelId })
      })
  }

  // テキストエリアの自動変形とstoreの更新
  watch(draft, () => {
    const reset = new Promise((resolve) => {
      resolve(textZoneHeight.value = 'auto')
    })

    reset.then(() => {
      const h = textZone.value?.scrollHeight as number - 4
      textZoneHeight.value = h + 'px'
    })

    draft.value.updated_at = format({ date: null, formatString })
    pushDraft({ newDraft: draft.value, key: draftKey })

    clearTimeout(fetchClearTimeout)
    fetchClearTimeout = setTimeout(() => {
      getFetch({ token })(draftUpdateUrl).post({ data: [draft.value] })
        .then(res => res.data.value)
        .then(jsonText => JSON.parse(jsonText as string))
        .then(json => {
          console.log(json)
        })
    }, 10000)
  }, { deep: true })

  const { isOverDropZone } = useDropZone(dropZone, droped)

  return {
    draft,
    dropZone,
    textZone,
    sendMessage,
    canSend: computed(() => Boolean(draft.value.message.length)),
    textZoneHeight,
    isOverDropZone,
  }
}
