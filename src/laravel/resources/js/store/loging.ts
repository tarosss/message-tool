import { computed, ref } from "vue"
import { defineStore } from 'pinia'

export const setLoging = (userId: string) => {
  const store = defineStore('loging', () => {
    const loging = ref(userId)
    return {
      loging: computed(() => loging.value),
    }
  })

  return store()
}

export const useLoging = defineStore('loging', () => {

})

