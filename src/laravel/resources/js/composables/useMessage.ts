import { computed, ref, Ref, watch, inject } from 'vue'
import { useDropZone } from '@vueuse/core'
import { useDrafts } from '../store/drafts'
import { format } from '../common/dateFormats'
import { getFetch, getFetch2 } from '../common/fetches'
import { deepCopy, toFormData } from '../common/objectUtils'
import { validDraft, getPostDraft, getEditorId } from '../common/draftUtils'
import { draftUpdateUrl, draftDeleteUrl, messageStoreUrl2, draftFileDeleteUrl, draftFilesUpdateUrl } from '../consts/fetches'

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
  const existFile = computed(() => Boolean(Object.entries(draft.value.files).length))
  // HTML関連
  const lineHeight = 1.5
  const dropZone = ref<HTMLElement>()
  const textZone = ref<HTMLElement>()
  const textZoneHeight = ref((lineHeight * 2) + 'px')
  const editorId = getEditorId({ messageId, channelId })
  const displayFilesZone = ref<HTMLElement>()

  const fetching = ref(false)

  const setMessage = (newMessage: string, runFetch: boolean = true) => {
    // draft.value.message = newMessage
    if (runFetch) {
      fetching.value = true
    }
  }

  const setFiles = (newFiles: { [fileName in string]: DraftFile }) => {
    draft.value.files = newFiles
  }

  // ファイルのドロップ
  const droped = (dropedfiles: File[] | null) => {
    if (!dropedfiles) {
      return
    }

    const files: { [fileName in string]: File } = {}
    let index = 0
    for (const file of dropedfiles) {
      files[`${file.name}-${index}`] = file
      index += 1
    }

    getFetch2({
      token,
      body: toFormData({
        channel_id: channelId,
        thread_message_id: messageId,
        user_id: userId,
        files,
      }),
      url: draftFilesUpdateUrl,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }

        return res.json()
      })
      .then((json) => json.files as {[key in string]: DraftFile})
      .then((uploadedfiles) => {
        for (const [fileName, draftFile] of Object.entries(uploadedfiles)) {
          draft.value.files[fileName] = draftFile
        }
      })
      .catch((res) => {
        console.error(res)
      })
    // console.log(dropedfiles)
    // for (const file of dropedfiles) {
    //   draft.value.files[file.name] = {
    //     sended: 0,
    //     original_file_name: file.name,
    //     created_at: now,
    //     file,
    //   }
    // }
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

  /**
   * ファイルが存在する時にpadding-bottomを追加する
   */
  const addPaddingBottom = () => {
    let paddingBottom = 10
    if (existFile.value) {
      // ファイルを表示するために空白を開ける
      paddingBottom += displayFilesZone.value?.offsetHeight as number
    }
    // エディタにpaddingを追加
    const element = document.getElementById(editorId)?.getElementsByClassName('q-editor__content') as HTMLCollectionOf<HTMLElement>
    for (let i = 0; i < element.length; i += 1) {
      element[i].style.paddingBottom = `${paddingBottom}px`
    }
  }

  /**
   * ファイルを削除する
   */
  const deleteFile = ({ fileData }:{ fileData: DraftFile }) => {
    if (fileData.sended === 0) {
      // 未送信のファイルではfetchしない
      delete draft.value.files[fileData.original_file_name]
      return
    }

    getFetch2({
      token,
      body: JSON.stringify(fileData),
      url: draftFileDeleteUrl,
      contentType: 'application/json',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        delete draft.value.files[fileData.original_file_name]
      })
      .catch((res) => {
        console.error(res)
      })
  }

  
  // テキストエリアの自動変形とstoreの更新
  watch(draft, () => {
    addPaddingBottom()

    if (!validDraft(draft.value)) {
      // テキストとファイルがからの場合はstoreのドラフトをけす
      deleteTimeout = setTimeout(() => {
        getFetch({ token })(draftDeleteUrl).post({ data: [draft.value] })
      }, timeout)
      return
    }
  }, { deep: true })

  watch(fetching, () => {
    if (!fetching.value) {
      return false
    }

    pushDraft({ newDraft: draft.value, key: draftKey })

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

    fetching.value = false
    return true
  })
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
    dummyMessage: draft.value.message,
    setMessage,
    dummyFiles: deepCopy(draft.value.files),
    setFiles,
    dropZone,
    textZone,
    editorId,
    existFile,
    displayFilesZone,
    deleteFile,
    sendMessage,
    canSend: computed(() => Boolean(draft.value.message.length)),
    textZoneHeight,
    isOverDropZone,
    definitions,
    toolBar,
  }
}
