import { ref, computed ,watchEffect} from 'vue'
import { defineStore } from 'pinia'

/**
 * 左ナビなど、商事されるコンテンツのフラグを管理
 */
export const useShowing = defineStore('showing', () => {
  const showingId = ref('')
  
  const setShowing = (newShowing: string) => {
    showingId.value = newShowing
  }

  watchEffect(() => {
    console.log('showing id is ' + showingId.value)
  })

  return {
    showing: computed(() => showingId.value),
    setShowing,
  }
})
