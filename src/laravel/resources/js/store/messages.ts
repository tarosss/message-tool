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

export const useMessages = defineStore('messages', () => {
  const messages: Ref<Message[]> = ref([])

  const setMessages = (newMessages: Message[]) => {
    messages.value = newMessages
  }

  return {
    messages: computed(() => messages.value),
    setMessages,
  }
})
