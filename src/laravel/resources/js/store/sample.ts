import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useSample = defineStore('sample', () => {
  const a = ref(1)
  return { a }
})
