import {ref, computed} from 'vue'
export const useSample = (n: number, array: any[]) => {
  const temp = ref(array)
  console.log(array)
  return {
    length: computed(() => temp.value.length),
  }
}
