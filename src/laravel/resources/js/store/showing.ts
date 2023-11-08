import { ref, Ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

/**
 * 左ナビなど、商事されるコンテンツのフラグを管理
 */
const store = defineStore('showing', () => {
  const showingId = ref('')
  /** s */
  const showingChannelId = ref('')
  const component = ref('')

  // 右関連
  /** 右にスレッドを表示するかのフラグ */
  const showThread = ref(false)
  /** ユーザのプロフィールとスレッドのメッセージの切り替えのフラグ */
  const rightContent: Ref<'thread' | 'profile'> = ref('thread')
  /** 右に表示するスレッドのメッセージId */
  const showingThreadMessageId = ref('')
  /** プロフィールを表示するユーザID */
  const profileUserId = ref('')

  /** チャンネル追加のモーダルウィンドウの表示 */
  const showAddChannelModal = ref(false)

  /** ダイレクトメッセージのモーダルウィンドウを表示 */
  const showAddDirectMessageModal = ref(false)

  /** チャンネル編集用のモーダルを表示 */
  const showChannelDialog = ref(false)
  /** チャンネル編集用のモーダルに表示するチャンネル */
  const channelDialogChannelId = ref('')

  const setShowing = (newShowing: string) => {
    showingId.value = newShowing
    switch (newShowing) {
      case '':
        component.value = 'nothing'
        break
      case 'message':
        component.value = 'message'
        break
      default:
        if (!showThread.value) {
          // スレッドが隠れている時に表示する
        }
    console.log(newShowing)

        showingChannelId.value = newShowing
        component.value = 'channel'
        break
    }
  }

  const setShowingChannelId = (newShowingChannelId: string) => {
    showingChannelId.value = newShowingChannelId
  }

  const setThread = (
    { newChannelId, newThreadMessageId }: { newChannelId: string, newThreadMessageId: string },
  ) => {
    showingChannelId.value = newChannelId
    showingThreadMessageId.value = newThreadMessageId
    if (newThreadMessageId) {
      showThread.value = true
    }
  }

  const setRightContent = (newValue: typeof rightContent.value) => {
    rightContent.value = newValue
  }

  const setShowingThread = (newShowThread: boolean) => {
    showThread.value = newShowThread
  }

  /**
   * 右にスレッドを表示する
   */
  const displayThread = (threadMessageId: string) => {
    showingThreadMessageId.value = threadMessageId
    rightContent.value = 'thread'
    showThread.value = true
  }

  /**
   * 右にユーザのプロフィールを表示する
   */
  const displayUserProfile = (userId: string) => {
    profileUserId.value = userId
    rightContent.value = 'profile'
    showThread.value = true
  }

  return {
    showing: computed(() => showingId.value),
    /** sc */
    showingChannelId: computed(() => showingChannelId.value),
    component: computed(() => component.value),
    showingThreadMessageId: computed(() => showingThreadMessageId.value),
    showThread: computed(() => showThread.value),
    rightContent: computed(() => rightContent.value),
    showAddChannelModal,
    showAddDirectMessageModal,
    showChannelDialog,
    channelDialogChannelId,
    profileUserId: computed(() => profileUserId.value),
    setShowing,
    setShowingChannelId,
    setThread,
    setShowingThread,
    setRightContent,
    displayThread,
    displayUserProfile,
  }
})

export const useShowing = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
