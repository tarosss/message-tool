import { computed, ref, Ref, watch, inject } from 'vue'
import { useDropZone } from '@vueuse/core'
import { useDrafts } from '../store/drafts'
import { format } from '../common/dateFormats'
import { getFetch, getFetch2 } from '../common/fetches'
import { deepCopy, toFormData } from '../common/objectUtils'
import { validDraft, getPostDraft } from '../common/draftUtils'
import { draftUpdateUrl, draftDeleteUrl, messageStoreUrl2 } from '../consts/fetches'

const formatString = 'yyyy-MM-dd HH:mm:ss'
const timeout = 1000
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
      files: {},
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
  let storeTimeout = null
  let deleteTimeout = null

  // メッセージデータ関連
  const draft = ref(getDraftData({ draftKey, userId, messageId, channelId }))

  // HTML関連
  const lineHeight = 1.5
  const dropZone = ref<HTMLElement>()
  const textZone = ref<HTMLElement>()
  const textZoneHeight = ref((lineHeight * 2) + 'px')

  // ファイルのドロップ
  const droped = (dropedfiles: File[] | null) => {
    if (!dropedfiles) {
      return
    }
    
    const now = format({ date: null, formatString })
    // console.log(dropedfiles)
    for (const file of dropedfiles) {
      draft.value.files[file.name] = {
        sended: 0,
        original_file_name: file.name,
        created_at: now,
        file,
      }
    }
  }

  // メッセージの投稿
  const sendMessage = async () => {
    getFetch2({
      token,
      body: toFormData(
        draft.value,
      ),
      url: messageStoreUrl2,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        draft.value.message = ''
        draft.value.files = {}
      })
      .catch(res => {
        console.error('send message is fail')
      })
  }

  // テキストエリアの自動変形とstoreの更新
  watch(draft, () => {
    console.log(draft.value.files)

    const reset = new Promise((resolve) => {
      resolve(textZoneHeight.value = 'auto')
    })

    reset.then(() => {
      const h = textZone.value?.scrollHeight as number - 4
      textZoneHeight.value = h + 'px'
    })
    if (!validDraft(draft.value)) {
      // テキストとファイルがからの場合はstoreのドラフトをけす
      deleteTimeout = setTimeout(() => {
        getFetch({ token })(draftDeleteUrl).post({ data: [draft.value] })
      }, timeout)
      return
    }
    // 更新日を更新
    // draft.value.updated_at = format({ date: null, formatString })
    // ストアの更新
    pushDraft({ newDraft: draft.value, key: draftKey })

    // console.log(toFormData(getPostDraft(draft.value)))
    clearTimeout(storeTimeout)
    clearTimeout(deleteTimeout)
    getFetch2({
      token,
      body: toFormData(
        getPostDraft(draft.value),
        // { data: { 0: getPostDraft(draft.value) } },
      ),
      url: draftUpdateUrl,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then((json) => json.draft)
      .then((draft) => {
        console.log(draft)
        return draft.files ?? []
      })
      .then((files) => {
        for (const [i, fileInfo] of Object.entries(files)) {
          draft.value.files[fileInfo.original_file_name].sended = 1
          // for (const file of draft.value.files) {
          //   if (file.file?.name === fileInfo.original_file_name) {
          //     file.sended = 1
          //     break
          //   }
          // }
        }
      })
  }, { deep: true })

  const { isOverDropZone } = useDropZone(dropZone, droped)

  // quasorのせってい
  const definitions = {
    send: {
      tip: '送信する',
      icon: 'send',
      handler: sendMessage,
    },
  }

  const toolBar = [
    ['bold', 'italic', 'strike', 'underline', 'quote', 'unordered', 'ordered', 'outdent', 'indent'],
    ['send'],
  ]

  return {
    draft,
    dropZone,
    textZone,
    sendMessage,
    canSend: computed(() => Boolean(draft.value.message.length)),
    textZoneHeight,
    isOverDropZone,
    definitions,
    toolBar,
  }
}
