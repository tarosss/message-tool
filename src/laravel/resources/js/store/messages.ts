import { computed, isReactive, ref, Ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useMessages as composableUseMessage } from '../composables/useMessages'

type PostData = {
  [channelId in string]: PostedMessage
}

type PostedMessage = {
  [messageId in string]: Message
}

type TypeReturnComposableUseMessage = ReturnType<typeof composableUseMessage>

export const useMessages = defineStore('messages', () => {
  // eslint-disable-next-line max-len
  const messagesByChannelId: Ref<Map<string, TypeReturnComposableUseMessage>> = ref(new Map<string, TypeReturnComposableUseMessage>())

  const getMessages = (key: string) => messagesByChannelId.value.get(key)

  /**
   * すでにchannel_id別になっているものをいれる
   * 新規のMaoを作成する
   */
  // eslint-disable-next-line max-len
  const setMessagesByChannelId = (newMessagesByChannelId: PostData) => {
    const tempMap = new Map<string, TypeReturnComposableUseMessage>()
    for (const [channelId, messageByMessageId] of Object.entries(newMessagesByChannelId)) {
      const composableMessage = composableUseMessage()
      composableMessage.setMessages(messageByMessageId)
      tempMap.set(channelId, composableMessage)
    }
    messagesByChannelId.value = tempMap
  }

  /**
   * チャンネルに関係なく全てのメッセージを返す
   */
  const getAllMessages = () => {

  }

  /**
   * 新しいチャンネル、ダイレクトメッセージが追加されたらキーを追加する
   */
  const pushChannel = (
    { newChannelKey, newMessages = {} }:{ newChannelKey: string, newMessages?: MapMessage },
  ) => {
    const newComposableMessage = composableUseMessage()
    newComposableMessage.setMessages(newMessages)
    messagesByChannelId.value.set(newChannelKey, newComposableMessage)
  }

  /**
   * 既存のチャンネルとダイレクトメッセージにメッセージを追加する
   */
  const pushMessage = (
    { channelKey, messageKey = undefined, newMessage }
    :{ channelKey: string, messageKey: string | undefined, newMessage: Message },
  ) => {
    messagesByChannelId.value
      .get(channelKey)?.pushMessage({ newMessage, key: messageKey ?? newMessage._id })
  }

  watchEffect(() => {
    console.log('store')
    console.log(messagesByChannelId.value)
    // messagesByChannelId.value.get('649c101eb13442cd850140e4')?.pushMessage({_id: "ac", message:"", createdAt:'', updatedAt:'', storage: 1, })
  })
  return {
    messages: computed(() => messagesByChannelId.value),
    getMessages,
    setMessagesByChannelId,
    getAllMessages,
    pushChannel,
    pushMessage,
    add: (key: string) => { messagesByChannelId.value.get(key)?.add() },
  }
})
