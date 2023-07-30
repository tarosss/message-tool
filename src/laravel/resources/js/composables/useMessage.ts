import { computed, ref, Ref, watch } from 'vue'
import { useDropZone } from '@vueuse/core'
import { boolean } from 'zod'

export const useMessage = () => {
  const lineHeight = 1.5

  const message = ref('')
  const files: Ref<File[]> = ref([])
  const dropZone = ref<HTMLElement>()
  const textZone = ref<HTMLElement>()
  const textZoneHeight = ref((lineHeight * 2) + 'px')
  const droped = (dropedfiles: File[] | null) => {
    if (dropedfiles) {
      files.value.push(...dropedfiles)
    }
  }

  watch(message, () => {
    const reset = new Promise((resolve) => {
      resolve(textZoneHeight.value = 'auto')
    })

    reset.then(() => {
      const h = textZone.value?.scrollHeight as number - 4
      textZoneHeight.value = h + 'px'
    })
  })

  const { isOverDropZone } = useDropZone(dropZone, droped)

  return {
    message,
    files,
    dropZone,
    textZone,
    canSend: computed(() => Boolean(message.value.length)),
    textZoneHeight,
    isOverDropZone,
  }
}
