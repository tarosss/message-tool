import { ref, watch } from 'vue'

export const useHeader = () => {
  const searchText = ref('')

  const showHeaderSearch = ref(false)
  /** 表示可能かどうか */
  const canShowHeaderSearch = ref(true)
  const showSearchDialog = ref(false)

  const setShowHeaderSearch = (newValue: boolean) => {
    showHeaderSearch.value = newValue
  }
  const setCanShowHeaderSearch = (newValue: boolean) => {
    canShowHeaderSearch.value = newValue
  }

  const setShowSearchDialog = (newValue: boolean) => {
    showSearchDialog.value = newValue
  }

  const clickTune = () => {
    showHeaderSearch.value = false
    showSearchDialog.value = true
  }

  watch(showSearchDialog, () => {
    canShowHeaderSearch.value = !showSearchDialog.value
  })

  return {
    searchText,
    showHeaderSearch,
    canShowHeaderSearch,
    showSearchDialog,
    setShowHeaderSearch,
    setCanShowHeaderSearch,
    setShowSearchDialog,
    clickTune,
  }
}
