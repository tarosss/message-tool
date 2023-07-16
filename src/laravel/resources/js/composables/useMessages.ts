import { computed, ref, Ref } from 'vue'

export const useMessages = () => {
  const messages: Ref<Message[]> = ref([])

  const setMessages = (newMessages: Message[]) => {
    messages.value = newMessages
  }

  const pushMessage = (newMessage: Message) => {
    messages.value.push(newMessage)
  }

  return {
    messages: computed(() => messages.value),
    setMessages,
    pushMessage,
  }
}
