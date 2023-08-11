import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = defineStore('test', () => {
  const a = ref(0)
  const b = ref(0)

  const setA = (newA: number) => {
    a.value = newA
  }

  const setB = (newB: number) => {
    b.value = newB
  }

  return {
    a,
    setA,
    b,
    setB,
  }
})

export function test() {
  const t = store()
  const refT = storeToRefs(t)

  return {
    ...t,
    ...refT,
  }
}
