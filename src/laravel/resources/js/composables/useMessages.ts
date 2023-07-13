import { computed, ref, unref, Ref, onBeforeMount } from 'vue'
import { useFetch } from '@vueuse/core'
import { isString } from '../common/assertions'
import { defineStore } from 'pinia'

type Message = {
  _id: string,
  message: string,
  storage: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
}

export const useChannels = defineStore('messages', () => {
  const channels: Ref<Message[]> = ref([])

  const setChannels = (newChannels: Message[]) => {
    channels.value = newChannels
  }

  return {
    channels: computed(() => channels.value),
    setChannels,
  }
})
