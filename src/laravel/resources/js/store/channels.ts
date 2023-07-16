import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
type Channels = {
  [key in string]: Channel
}

export const useChannels = defineStore('channels', () => {
  const channels: Ref<Channels[]> = ref([])

  const setChannels = (newChannels: Channels[]) => {
    channels.value = newChannels
  }

  const setChannel = (newChannel: Channel) => {
    channels.value[newChannel._id] = newChannel
  }

  return {
    channels: computed(() => channels.value),
    setChannels,
    setChannel,
  }
})
