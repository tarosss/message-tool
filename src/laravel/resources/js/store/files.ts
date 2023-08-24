import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const store = defineStore('files', () => {
  const files = ref(new Map<string, MessageFile>())

  const setFiles = (filesObject: MapFile) => {
    files.value = new Map<string, MessageFile>(Object.entries(filesObject))
  }

  const pushFile = ({ newFile, key }: { newFile: MessageFile, key?: string }) => {
    files.value.set(key ?? newFile._id, newFile)
  }

  const deleteDraft = (key: string) => {
    files.value.delete(key)
  }

  return {
    files: computed(() => files.value),
    setFiles,
    pushFile,
    deleteDraft,
  }
})

export const useFiles = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
