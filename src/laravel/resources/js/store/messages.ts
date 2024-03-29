import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { format } from '../common/dateFormats'
/**
 * チャンネル別にメッセージを保存
 * @param channelId
 * @returns
 */
export const useMessages = (channelId: string) => {
  const dateFormat = 'yyyy-MM-dd'

  const store = defineStore(channelId, () => {
    const messages = ref(new Map<string, Message>())

    // 日別のId スレッドメッセージは除く
    const messageIdsByDay = ref(new Map<string, string[]>())

    const setMessages = (messagesObject: MapMessage) => {
      messages.value = new Map<string, Message>(Object.entries(messagesObject))

      const temp: { [date in string]: string[] } = {}
      for (const [messageId, message] of messages.value) {
        if (message.thread_message_id) {
          continue
        }

        const date = format({ date: message.created_at, formatString: dateFormat })
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

      console.log(newMessage.thread_message_id)
      if (newMessage.thread_message_id) {
        // スレッドのメッセージの場合はスレッドの元の配列に追加
        messages.value.get(newMessage.thread_message_id)?.thread.push(newMessage._id)
        // 一覧としては表示しないためここで終了
        return
      }

      const date = format({ date: newMessage.created_at, formatString: dateFormat })
      console.log(date)
      if (messageIdsByDay.value.has(date)) {
        (messageIdsByDay.value.get(date) as string[]).push(newMessage._id)
      } else {
        // キーが存在しない場合は新たに追加する
        messageIdsByDay.value.set(date, [newMessage._id])
      }
    }

    const updateMessage = ({ updatedMessage, key }: { updatedMessage: Message, key?: string }) => {
      messages.value.set(key ?? updatedMessage._id, updatedMessage)
    }

    const addReaction = (
      { userId, reactionId, messageId }: { userId: string, reactionId: string, messageId: string },
    ) => {
      const m = messages.value.get(messageId) as Message
      if (m.reactions === undefined) {
        m.reactions = []
      }
      m.reactions.push({ userId, reactionId })
      messages.value.set(messageId, m)
    }

    return {
      messages: computed(() => messages.value),
      messageIdsByDay: computed(() => messageIdsByDay.value),
      setMessages,
      pushMessage,
      updateMessage,
      addReaction,
    }
  })

  // piniaのdefineStoreを返す
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
