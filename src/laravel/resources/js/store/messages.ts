import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'

/**
 * チャンネル別にメッセージを保存
 * @param channelId
 * @returns
 */
export const useMessages = (channelId: string) => {
  const dateFormat = 'yyyy-MM-dd'

  const store = defineStore(channelId, () => {
    const messages = ref(new Map<string, Message>())

    // 日別のId
    const messageIdsByDay = ref(new Map<string, string[]>())

    const setMessages = (messagesObject: MapMessage) => {
      messages.value = new Map<string, Message>(Object.entries(messagesObject))

      const temp: { [date in string]: string[] } = {}
      for (const [messageId, message] of messages.value) {
        const date = format(new Date(message.created_at), dateFormat)
        if (temp[date] === undefined) {
          temp[date] = [messageId]
        } else {
          temp[date].push(messageId)
        }
      }

      messageIdsByDay.value = new Map<string, string[]>(Object.entries(temp))
    }

    const pushMessage = ({ newMessage, key }:{ newMessage: Message, key?: string }) => {
      messages.value.set(key ?? newMessage._id, newMessage)

      const date = format(new Date(newMessage.created_at), dateFormat)
      if (messageIdsByDay.value.has(date)) {
        (messageIdsByDay.value.get(date) as string[]).push(newMessage._id)
      } else {
        // キーが存在しない場合は新たに追加する
        messageIdsByDay.value.set(date, [newMessage._id])
      }
    }

    return {
      messages: computed(() => messages.value),
      messageIdsByDay: computed(() => messageIdsByDay.value),
      setMessages,
      pushMessage,
    }
  })

  // piniaのdefineStoreを返す
  return store()
}
