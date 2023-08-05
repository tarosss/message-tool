import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

/**
 * 左ナビなど、商事されるコンテンツのフラグを管理
 */
const store = defineStore('showing', () => {
  const showingId = ref('')
  const component = ref('')
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
        break
    }
  }

  return {
    showing: computed(() => showingId.value),
    component: computed(() => component.value),
    setShowing,
  }
})

export const useShowing = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
