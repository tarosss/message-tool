import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

/**
 * 左ナビなど、商事されるコンテンツのフラグを管理
 */
const store = defineStore('showing', () => {
  const showingId = ref('')
  /** s */
  const showingChannelId = ref('')
  const component = ref('')
  const showingThreadMessageId = ref('')
  const showThread = ref(false)
  /** チャンネル追加のモーダルウィンドウの表示 */
  const showAddChannelModal = ref(false)

  /** ダイレクトメッセージのモーダルウィンドウを表示 */
  const showAddDirectMessageModal = ref(false)

  /** チャンネル編集用のモーダルを表示 */
  const showChannelDialog = ref(false)
  /** チャンネル編集用のモーダルに表示するチャンネル */
  const channelDialogChannelId = ref('')

  /** プロフィールを表示するユーザID */
  const profileUserId = ref('')

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
          showingChannelId.value = newShowing
        }
        component.value = 'channel'
        break
    }
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

  const setShowingThread = (newShowThread: boolean) => {
    showThread.value = newShowThread
  }

  /**
   * 右にユーザのプロフィールを表示する
   */
  const displayUserProfile = (userId: string) => {
    profileUserId.value = userId
    showThread.value = true
  }
  
  return {
    showing: computed(() => showingId.value),
    /** sc */
    showingChannelId: computed(() => showingChannelId.value),
    component: computed(() => component.value),
    showingThreadMessageId: computed(() => showingThreadMessageId.value),
    showThread: computed(() => showThread.value),
    showAddChannelModal,
    showAddDirectMessageModal,
    showChannelDialog,
    channelDialogChannelId,
    profileUserId: computed(() => profileUserId.value),
    setShowing,
    setThread,
    setShowingThread,
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
