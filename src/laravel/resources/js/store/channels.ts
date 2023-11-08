import { computed, inject, ref, Ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUsers } from '../store/users'
import { CHANNEL_TYPE_NORMAL, CHANNEL_TYPE_DIRECT_MESSAGE, CHANNEL_TYPE_MEMO } from '../consts/channel'

type DirectMessage = Channel & {
  display_channel_name: string,
  another_user_id: string,
  display_channel_icon: string | undefined,
}

const store = defineStore('channels', () => {
  const userId = inject('logging-user-id', '')
  const channels: Ref<Map<string, Channel>> = ref(new Map<string, Channel>())
  const participatingChannels: typeof channels = ref(new Map<string, Channel>())
  const directMessages: Ref<Map<string, Channel>> = ref(new Map<string, Channel>())
  const userIdsAlreadyCreatedDirectMessage: Ref<string[]> = ref([])

  const getChannel = (key: string) => channels.value.get(key) as Channel

  /**
   * 新しいMapを生成する
   */
  const setChannels = (channelObjects: MapChannel) => {
    channels.value = new Map(Object.entries(channelObjects))
  }

  const pushChannel = ({ newChannel, key = undefined }: { newChannel: Channel, key?: string }) => {
    channels.value.set(key ?? newChannel._id, newChannel)
  }

  /**
   * 同じダイレクトメッセージに属しているもう一人のユーザIDを返す
   * @param channel
   * @returns
   */
  const getAnotherUserId = (channel: Channel) => {
    if (channel.channel_type === CHANNEL_TYPE_NORMAL) {
      // 通常チャンネルの場合はahotherUserIdは使わないので空文字を返す
      return ''
    }

    if (channel.channel_type === CHANNEL_TYPE_DIRECT_MESSAGE) {
      return channel.users.filter((id) => id !== userId)[0]
    }

    return channel.users[0]
  }

  /**
   * ダイレクトメッセージや自分用のメモなどのチャンネル名を取得
   */
  const getDisplayChannelName = (channel: Channel) => {
    if (channel.channel_type === CHANNEL_TYPE_NORMAL) {
      return channel.channel_name
    }

    const { getUser } = useUsers()
    const u = getUser(getAnotherUserId(channel))
    if (u === undefined) {
      return ''
    }
    return u.display_name
  }

  /**
   * 与えられたダイレクトメッセージのidを取得する
   * 同じIDが指定された場合自分用のメッセージのIDを返す
   * @param userId1
   * @param userId2
   */
  const getDirectMessageChannelId = (userId1: string, userId2: string) => {
    if (userId1 === userId2) {
      for (const [channelId, channel] of channels.value) {
        if (
          channel.channel_type === CHANNEL_TYPE_MEMO
          && channel.users.includes(userId1)
        ) {
          return channelId
        }
      }
    }

    for (const [channelId, channel] of channels.value) {
      if (
        channel.channel_type === CHANNEL_TYPE_DIRECT_MESSAGE
        && channel.users.includes(userId1)
        && channel.users.includes(userId2)
      ) {
        return channelId
      }
    }

    return undefined
  }

  watch(channels, () => {
    const tempParticipatingChannels: typeof participatingChannels.value = new Map()
    const tempDirectMessages: typeof directMessages.value = new Map()
    const tempUserIdsAlreadyCreatedDirectMessage:
      typeof userIdsAlreadyCreatedDirectMessage.value = []

    for (const [channelId, channel] of channels.value) {
      if (channel.channel_type === CHANNEL_TYPE_NORMAL && channel.users.includes(userId)) {
        tempParticipatingChannels.set(channelId, channel)
      }

      if (
        (
          channel.channel_type === CHANNEL_TYPE_DIRECT_MESSAGE
          || channel.channel_type === CHANNEL_TYPE_MEMO
        )
        && channel.users.includes(userId)
      ) {
        tempDirectMessages.set(channelId, channel)

        const tempUserId = getAnotherUserId(channel)
        // 既にダイレクトメッセージが作成されているユーザを登録
        tempUserIdsAlreadyCreatedDirectMessage.push(tempUserId)
      }
    }

    participatingChannels.value = tempParticipatingChannels
    directMessages.value = tempDirectMessages
    userIdsAlreadyCreatedDirectMessage.value = tempUserIdsAlreadyCreatedDirectMessage
  }, { deep: true })

  return {
    channels: computed(() => channels.value),
    participatingChannels: computed(() => participatingChannels.value),
    directMessages: computed(() => directMessages.value),
    userIdsAlreadyCreatedDirectMessage: computed(() => userIdsAlreadyCreatedDirectMessage.value),
    channelIds: computed(() => Array.from(channels.value.keys())),
    getChannel,
    setChannels,
    pushChannel,
    getAnotherUserId,
    getDisplayChannelName,
    getDirectMessageChannelId,
  }
})

export const useChannels = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
