import { computed, ref, Ref, watch, inject, onMounted, watchEffect } from 'vue'
import { useDropZone, useElementSize } from '@vueuse/core'
import { useDrafts } from '../store/drafts'
import { format } from '../common/dateFormats'
import { getFetch, getFetch2, fetchDeleteDraftFile } from '../common/fetches'
import { deepCopy, toFormData } from '../common/objectUtils'
import { validDraft, getPostDraft, getEditorId, getDefaultDraft, getDraftData, getDraftKey } from '../common/draftUtils'
import { draftUpdateUrl, draftDeleteUrl, messageStoreUrl2, draftFileDeleteUrl, draftFilesUpdateUrl } from '../consts/fetches'
import { oneOrMore } from '../common/regularExpression'

const timeout = 1000
type MessageType = {
  userId: string,
  channelId: string,
  messageId?: string,
}

export const useMessage = ({ messageId, channelId }: Omit<MessageType, 'userId'>) => {
  const { pushDraft, deleteDraft } = useDrafts()
  const userId = inject('logging-user-id', '')
  const token = inject('token', '')
  const storage = inject('storage', 1)

  const draftKey = getDraftKey({ userId, messageId, channelId })
  let storeDraftTimeout: any
  let deleteDraftTimeout: any

  // メッセージデータ関連
  const draft = ref(getDraftData({ userId, channelId, threadMessageId: messageId }))
  const dummyMessage = ref(draft.value.message)
  const existFile = computed(() => Boolean(Object.entries(draft.value.files).length))

  // HTML関連
  const dropZone = ref<HTMLElement>()
  /** メンションの表示枠 */
  const mentionZone = ref<HTMLElement>()
  const { height: mentionZoneHeight } = useElementSize(mentionZone)
  const showMentions = ref(false)
  const displayFilesZone = ref<HTMLElement>()
  const { height: displayFilesZoneHeight } = useElementSize(displayFilesZone)
  const editorId = getEditorId({ messageId, channelId })
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
        // 成功したら全てのデータを初期化
        draft.value.message = ''
        draft.value.files = {}
        draft.value.mentions = []
        dummyMessage.value = ''
      })
      .catch(res => {
        console.error('send message is fail')
      })
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
    }, timeout)
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
    }, timeout)
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
          draft.value.files[fileName] = draftFile
        }
        console.log(draft.value.files)
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

  const setMentions = (mentions: string[]) => {
    draft.value.mentions = mentions
  }

  /**
   * 送られてきたユーザIDが配列に存在していれば取り除く
   * 存在しなければ追加する
   */
  const updateMentions = (subjectUserId: string) => {
    if (draft.value.mentions.includes(subjectUserId)) {
      // 取り除く
      draft.value.mentions = draft.value.mentions.filter((userid) => {
        return userid !== subjectUserId
      })
    } else {
      // 追加
      draft.value.mentions.push(subjectUserId)
    }
    createStoreDraftFetchTimeout()
  }

  const setShowMentions = (value: boolean) => {
    showMentions.value = value
  }

  watch(draft, () => {
    if (oneOrMore(draft.value.message) || existFile.value) {
      // messageが一文字以上か、ファイルが一つ以上の場合はデータベースから削除しない
      return
    }

    // messageとfileが空になったらデータベースから削除するfetchを実行する
    createDeleteDraftFetchTimeout()
  }, { deep: true })

  /**
   * ファイルが存在する時にpadding-bottomを追加する
   */
  watch(displayFilesZoneHeight, () => {
    let paddingBottom = 20
    if (existFile.value) {
      // ファイルを表示するために空白を開ける
      paddingBottom += displayFilesZoneHeight.value
    }
    // エディタにpaddingを追加
    const element = document.getElementById(editorId)?.getElementsByClassName('q-editor__content')
    if (element === undefined) {
      return
    }

    for (let i = 0; i < (element as HTMLCollectionOf<HTMLElement>).length; i += 1) {
      (element as HTMLCollectionOf<HTMLElement>)[i].style.paddingBottom = `${paddingBottom}px`
    }
  })

  /**
   * メンションの表示欄用のpaddingを追加する
   */
  watch(mentionZoneHeight, () => {
    let paddingTop = 10
    if (draft.value.mentions) {
      paddingTop += mentionZoneHeight.value
    }

    // エディタにpaddingを追加
    const element = document.getElementById(editorId)?.getElementsByClassName('q-editor__content')
    if (element === undefined) {
      return
    }

    for (let i = 0; i < (element as HTMLCollectionOf<HTMLElement>).length; i += 1) {
      (element as HTMLCollectionOf<HTMLElement>)[i].style.paddingTop = `${paddingTop}px`
    }
  })
  const { isOverDropZone } = useDropZone(dropZone, droped)

  // quasorのせってい
  const definitions = {
    send: {
      tip: '送信する',
      icon: 'send',
      handler: sendMessage,
    },
    mention: {
      tip: 'メンション',
      icon: 'alternate_email',
      handler: setShowMentions,
    },
  }

  const toolBar = [
    ['bold', 'italic', 'strike', 'underline', 'quote', 'unordered', 'ordered', 'outdent', 'indent', 'mention'],
    ['send'],
  ]

  return {
    draft,
    dummyMessage,
    setMessage,
    showMentions,
    setMentions,
    updateMentions,
    setShowMentions,
    mentionZone,
    dropZone,
    editorId,
    existFile,
    displayFilesZone,
    sendMessage,
    createDeleteDraftFileFetch,
    canSend: computed(() => Boolean(draft.value.message.length)),
    isOverDropZone,
    definitions,
    toolBar,
  }
}
