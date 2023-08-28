import { computed, ref, Ref, watch, inject } from 'vue'
import { useDropZone } from '@vueuse/core'
import { useDrafts } from '../store/drafts'
import { format } from '../common/dateFormats'
import { getFetch, getFetch2, fetchDeleteDraftFile } from '../common/fetches'
import { deepCopy, toFormData } from '../common/objectUtils'
import { validDraft, getPostDraft, getEditorId } from '../common/draftUtils'
import { draftUpdateUrl, draftDeleteUrl, messageStoreUrl2, draftFileDeleteUrl, draftFilesUpdateUrl } from '../consts/fetches'
import { oneOrMore } from '../common/regularExpression'

const formatString = 'yyyy-MM-dd HH:mm:ss'
const timeout = 1000
type MessageType = {
  userId: string,
  channelId: string,
  messageId?: string,
}

type GetDraftAttr = MessageType & {
  draftKey: string,
  userId: string,
  default?: boolean
}

const getDraftKey = ({ userId, messageId, channelId }: MessageType) => {
  if (messageId) {
    return `${userId}-${channelId}-${messageId}`
  }

  return `${userId}-${channelId}`
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

export const useMessage = ({ messageId, channelId }: Omit<MessageType, 'userId'>) => {
  const { pushDraft, deleteDraft } = useDrafts()
  const userId = inject('loging-user-id', '')
  const token = inject('token', '')
  const storage = inject('storage', 1)

  const draftKey = getDraftKey({ userId, messageId, channelId })
  let storeDraftTimeout: any
  let deleteDraftTimeout: any

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

  // メッセージの投稿
  const sendMessage = () => {
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
   * ファイル以外のデータをデータベースに保存するためのフェッチを作成する
   */
  const createStoreDraftFetchTimeout = () => {
    // 既存のfetchTimeoutを削除
    clearTimeout(storeDraftTimeout)
    clearTimeout(deleteDraftTimeout)

    // timeoutを新しく作成
    storeDraftTimeout = setTimeout(() => {
      getFetch2({
        token,
        body: toFormData(
          getPostDraft(draft.value),
        ),
        url: draftUpdateUrl,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error()
          }
          return res.json()
        })
        .then((json) => json.draft._id as string)
        .then((_id) => {
          if (draft.value._id === undefined) {
            // _idがundefinedの場合はレスポンスの_idを設定する
            draft.value._id = _id
          }
        })
    }, timeout);
  }

  /**
   * ドラフトのファイルをデータベースから削除するfetchを作成する
   */
  const createDeleteDraftFetchTimeout = () => {
    // 既存のfetchTimeoutを削除
    clearTimeout(storeDraftTimeout)
    clearTimeout(deleteDraftTimeout)

    deleteDraftTimeout = setTimeout(() => {
      getFetch2({
        token,
        body: JSON.stringify({ data: draft.value }),
        url: draftDeleteUrl,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error()
          }

          deleteDraft(draftKey)
        })
        .catch((e) => {
          console.error(e)
        })
    }, timeout);
  }

  /**
   * ファイルサーバに保存するfetchを実行する
   */
  const createStoreDraftFileFetch = (files: { [key in string]: File }) => {
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
      .then((json) => json.files as { [key in string]: DraftFile })
      .then((uploadedfiles) => {
        for (const [fileName, draftFile] of Object.entries(uploadedfiles)) {
          console.log(fileName)
          console.log(draftFile)
          draft.value.files[fileName] = draftFile
        }
        console.log(draft.value.files)
        addPaddingBottom()
      })
      .catch((res) => {
        console.error(res)
      })
  }
  /**
   * fetchでファイルを削除する
   */
  const createDeleteDraftFileFetch = (draftFile: DraftFile) => {
    fetchDeleteDraftFile({
      token,
      body: JSON.stringify({
        file_name: draftFile.file_name,
        user_id: userId,
        draft_key: draftKey,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        delete draft.value.files[draftFile.file_name as string]
        console.log(draft.value)
        addPaddingBottom()
      })
      .catch((res) => {
        console.error(res)
      })
  }

  const setMessage = (newMessage: string, runFetch: boolean = true) => {
    draft.value.message = newMessage
    if (runFetch) {
      // データベース更新のためのfetchを行う
      createStoreDraftFetchTimeout()
    }
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

    // fetchでファイルをアップロードする
    createStoreDraftFileFetch(files)
  }

  watch(draft, () => {
    if (oneOrMore(draft.value.message) || existFile.value) {
      // messageが一文字以上か、ファイルが一つ以上の場合はデータベースから削除しない
      return
    }

    // messageとfileが空になったらデータベースから削除するfetchを実行する
    createDeleteDraftFetchTimeout()
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
    dummyMessage: draft.value.message,
    setMessage,
    dropZone,
    textZone,
    editorId,
    existFile,
    displayFilesZone,
    sendMessage,
    createDeleteDraftFileFetch,
    canSend: computed(() => Boolean(draft.value.message.length)),
    textZoneHeight,
    isOverDropZone,
    definitions,
    toolBar,
  }
}
