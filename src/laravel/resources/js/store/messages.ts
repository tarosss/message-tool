import { Ref, computed, ref } from "vue"
import { defineStore } from 'pinia'

/**
 * チャンネル別にメッセージを保存
 * @param channelId
 * @returns
 */
export const useMessages = (channelId: string) => {
  const store = defineStore(channelId, () => {
    const messages = ref(new Map<string, Message>())
    const setMessages = (messagesObject: MapMessage) => {
      messages.value = new Map<string, Message>(Object.entries(messagesObject))
    }

    const pushMessage = ({ newMessage, key }:{ newMessage: Message, key?: string }) => {
      messages.value.set(key ?? newMessage._id, newMessage)
    }

    return {
      messages: computed(() => messages.value),
      setMessages,
      pushMessage,
    }
  })

  // piniaのdefineStoreを返す
  return store()
}
