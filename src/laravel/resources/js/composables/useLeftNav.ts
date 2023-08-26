import { ref } from 'vue'

export const useLeftNav = () => {
  const data = ref([
    {
      icon: 'message',
      name: 'スレッド',
    },
  ])

  return {
    data,
  }
}
