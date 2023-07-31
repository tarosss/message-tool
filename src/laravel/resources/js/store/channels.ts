import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useChannels = defineStore('channels', () => {
  const channels: Ref<Map<string, Channel>> = ref(new Map<string, Channel>())

  const getChannel = (key: string) => channels.value.get(key) as Channel

  /**
   * 新しいMapを生成する
   */
  const setChannels = (channelObjects: MapChannel) => {
    channels.value = new Map(Object.entries(channelObjects))
    console.log(channels.value.keys())
  }

  const pushChannel = ({ newChannel, key = undefined }: { newChannel: Channel, key?: string }) => {
    channels.value.set(key ?? newChannel._id, newChannel)
  }

  return {
    channels: computed(() => channels.value),
    channelIds: computed(() => Array.from(channels.value.keys())),
    getChannel,
    setChannels,
    pushChannel,
  }
})
