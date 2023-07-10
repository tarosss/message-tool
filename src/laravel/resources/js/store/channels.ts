import { computed, ref, unref, Ref, onBeforeMount } from 'vue'
import { useFetch } from '@vueuse/core'
import { isString } from '../common/assertions'
import { defineStore } from 'pinia'

type Response = {
  error: boolean,
  channel_type: number,
  channels: Channel[]
}
type Channel = {
  _id: string,
  channel_type: number,
  channel_name: string,
}

export const useChannels = defineStore('channels', () => {
  const channels: Ref<Channel[]> = ref([])

  const setChannels = (newChannels: Channel[]) => {
    console.log(newChannels)
    channels.value = newChannels
  }

  return { channels: computed(() => channels.value), setChannels }
})
