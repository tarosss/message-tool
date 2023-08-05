import { ref } from 'vue'
import { useElementHover as uel } from '@vueuse/core'

export const useElementHover = () => {
  const element = ref<HTMLElement>()
  const isHoverd = uel(element)

  return {
    element,
    isHoverd,
  }
}
