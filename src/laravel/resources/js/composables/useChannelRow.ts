import { computed, ref } from 'vue'
import { useShowing } from '../store/showing'
import { useUsers } from '../store/users'
import { useChannels } from '../store/channels'

import { CHANNEL_TYPE_NORMAL, CHANNEL_TYPE_DIRECT_MESSAGE, CHANNEL_TYPE_MEMO } from '../consts/channel'

export const useChannelRow = (channel: Channel) => {
  const { showing, setShowing } = useShowing()
  const { getAnotherUserId, getDisplayChannelName } = useChannels()

  /** このチャンネルが現在表示されているか */
  const isShowing = computed(() => showing.value === channel._id)
  const anotherUserId = getAnotherUserId(channel)
  const displayChannelName = (() => {
    const d = getDisplayChannelName(channel)
    if (channel.channel_type === CHANNEL_TYPE_MEMO) {
      return `${d} (自分)`
    }
    return d
  })()

  /** 表示用のアイコンのデータ */
  const displayIcon = () => {
    
  }

  const showChannel = () => {
    setShowing(channel._id)
  }

  return {
    isShowing,
    displayChannelName,
    showChannel,
  }
}
