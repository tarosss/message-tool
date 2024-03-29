import { computed, ref, Ref } from 'vue'

export const useMessages = () => {
  const messages: Ref<Map<string, Message>> = ref(new Map<string, Message>())

  /**
   * 連想配列からMapを生成する
   */
  const setMessages = (objectMessages: MapMessage) => {
    messages.value = new Map(Object.entries(objectMessages))
  }

  const pushMessage = (
    { newMessage, key = undefined } : { newMessage: Message, key: string | undefined },
  ) => {
    messages.value.set(key ?? newMessage._id, newMessage)
  }

  return {
    messages: computed(() => messages.value),
    setMessages,
    pushMessage,
  }
}
// export const useMessages = () => {
//   const messages: Ref<Message[]> = ref([])

//   const setMessages = (newMessages: Message[]) => {
//     messages.value = newMessages
//   }

//   const pushMessage = (newMessage: Message) => {
//     messages.value.push(newMessage)
//   }

//   return {
//     messages: computed(() => messages.value),
//     setMessages,
//     pushMessage,
//   }
// }
