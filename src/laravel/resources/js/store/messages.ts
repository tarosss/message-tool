import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useMessages as messages } from '../composables/useMessages'

// type MessagesByChannelId = {
//   [key in string]: Message[]
// }

type PostData = {
  [channelId in string]: PostedMessage
}

type PostedMessage = {
  [messageId in string]: Message
}

export const useMessages = defineStore('messages', () => {
  const messagesByChannelId = ref(new Map<string, Map<string, Message>>())

  /**
   * すでにchannel_id別になっているものをいれる
   * 新規のMaoを作成する
   */
  // eslint-disable-next-line max-len
  const setMessagesByChannelId = (newMessagesByChannelId: PostData) => {
    const tempMap = new Map<string, Map<string, Message>>()
    for (const [channelId, messageByMessageId] of Object.entries(newMessagesByChannelId)) {
      tempMap.set(channelId, new Map(Object.entries(messageByMessageId)))
    }
    messagesByChannelId.value = tempMap
    // console.log(messagesByChannelId.value.get('649c0ca38a43f8c5c28b5318'))
    console.log(messagesByChannelId.value.get('649c0ca38a43f8c5c28b5318')?.get("64b137936b34f084340acf12")?._id)
  }

  /**
   * 既存のチャンネルとダイレクトメッセージにメッセージを追加する
   */
  const pushMessage = (
    { channelId, newMessage }:{ channelId: string, newMessage: Message },
  ) => {
    messagesByChannelId.value.get(channelId)?.push(newMessage)
  }

  const deleteMessage = (
    {}:{}
  ) => {

  }

  /**
   * 新しいチャンネル、ダイレクトメッセージが追加されたらキーを追加する
   */
  const pushChannel = (
    { newChannelId, newMessages = [] }:{ newChannelId: string, newMessages: Message[] },
  ) => {
    messagesByChannelId.value.set(newChannelId, newMessages)
  }

  return {
    messagesByChannelId: computed(() => messagesByChannelId.value),
    setMessagesByChannelId,
    pushChannel,
    pushMessage,
  }
})

// export const useMessages = defineStore('messages', () => {
//   const messagesByChannelId: Ref<MessagesByChannelId[]> = ref([])

//   const setMessagesByChannelId = (newMessagesByChannelId: MessagesByChannelId[]) => {
//     messagesByChannelId.value = newMessagesByChannelId
//   }

//   const setMessages = (channelId: string, newMessages: Message[]) => {
//     messagesByChannelId.value[channelId] = newMessages
//   }

//   const setMessage = (channelId: string, newMessage: Message) => {
//     (messagesByChannelId.value[channelId] as Message[]).push(newMessage)
//   }

//   return {
//     messagesByChannelId: computed(() => messagesByChannelId.value),
//     setMessagesByChannelId,
//     setMessages,
//     setMessage,
//   }
// })
