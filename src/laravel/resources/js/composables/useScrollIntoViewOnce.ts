import { ref } from 'vue'

export const useScrollIntoViewOnce = () => {
  const htmlElement = ref<HTMLElement>()
  let isFirst = true

  const bottom = () => {
    if (!isFirst) {
      return
    }

    htmlElement.value?.scrollIntoView(false)
    isFirst = false
  }

  return {
    htmlElement,
    bottom,
  }
}
