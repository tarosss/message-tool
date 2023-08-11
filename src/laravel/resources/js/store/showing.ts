import { ref, computed } from 'vue'
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
        component.value = 'channel'
        showingChannelId.value = newShowing
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

  return {
    showing: computed(() => showingId.value),
    /** sc */
    showingChannelId: computed(() => showingChannelId.value),
    component: computed(() => component.value),
    showingThreadMessageId: computed(() => showingThreadMessageId.value),
    showThread: computed(() => showThread.value),
    setShowing,
    setThread,
    setShowingThread,
  }
})

export const useShowing = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
