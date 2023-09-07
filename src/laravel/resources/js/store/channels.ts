import { computed, inject, ref, Ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUsers } from './users'

type DirectMessage = Channel & {
  anotherUserName: string,
  anotherUserId: string,
  anotherUserIcon: string | undefined,
}

const store = defineStore('channels', () => {
  const userId = inject('logging-user-id', '')
  const { users } = useUsers()
  const channels: Ref<Map<string, Channel>> = ref(new Map<string, Channel>())
  const participatingChannels: Ref<Map<string, Channel>> = ref(new Map<string, Channel>())
  const directMessages: Ref<Map<string, DirectMessage>> = ref(new Map<string, DirectMessage>())

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

  watch(channels, () => {
    const tempParticipatingChannels: Map<string, Channel> = new Map()
    const tempDirectMessages: Map<string, DirectMessage> = new Map()

    for (const [channelId, channel] of channels.value) {
      if (channel.users.includes(userId)) {
        tempParticipatingChannels.set(channelId, channel)
      }

      if (channel.channel_type === 2 && channel.users.includes(userId)) {
        const anotherUserId = channel.users.filter((id) => {
          return id !== userId
        })

        const anotherUser = users.value.get(anotherUserId[0]) as User
        tempDirectMessages.set(channelId, Object.assign(channel, {
          anotherUserName: anotherUser.display_name,
          anotherUserId: anotherUser._id,
          anotherUserIcon: anotherUser.icon,
        }))
      }
    }

    participatingChannels.value = tempParticipatingChannels
    directMessages.value = tempDirectMessages
  })

  return {
    channels: computed(() => channels.value),
    participatingChannels: computed(() => participatingChannels.value),
    directMessages: computed(() => directMessages.value),
    channelIds: computed(() => Array.from(channels.value.keys())),
    getChannel,
    setChannels,
    pushChannel,
  }
})

export const useChannels = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
