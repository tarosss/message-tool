import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const store = defineStore('drafts', () => {
  const drafts = ref(new Map<string, Draft>())

  const setDrafts = (draftsObject: MapMessage) => {
    drafts.value = new Map<string, Draft>(Object.entries(draftsObject))
  }

  const pushDraft = ({ newDraft, key }: { newDraft: Draft, key: string }) => {
    drafts.value.set(key, newDraft)
  }

  return {
    drafts: computed(() => drafts.value),
    setDrafts,
    pushDraft,
  }
})

export const useDrafts = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
