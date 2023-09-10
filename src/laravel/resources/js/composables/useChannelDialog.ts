import { computed, ref } from 'vue'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'

export const useChannelDialog = () => {
  const { channelDialogChannelId } = useShowing()
  const { channels } = useChannels()
  const { users } = useUsers()

  const targetChannel = computed(() => channels.value.get(channelDialogChannelId.value) as Channel)
  const tab = ref('')
  const searchName = ref('')

  /**
   * ユーザをチャンネルに追加する
   */
  const addUser = () => {
    
  }

  return {
    targetChannel,
    tab,
    searchName,
    addUser,
  }
}
