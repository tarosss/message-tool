import { useDropZone as udz } from '@vueuse/core'
import { ref } from 'vue'

export const useDropZone = () => {
  const dropZoneRef = ref<HTMLElement>()
  const droped = () => {
    console.log("acakvma")
  }

  const { isOverDropZone } = udz(dropZoneRef, droped)
  return {
    dropZoneRef,
    isOverDropZone,
  }
}
