import { ref } from 'vue'

export const useAddDirectMessage = () => {
  const serachName = ref('')

  return {
    serachName,
  }
}
