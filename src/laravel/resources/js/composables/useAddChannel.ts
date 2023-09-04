import { computed, ref, Ref, watch , inject } from 'vue'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { fetchStoreChannel } from '../common/fetches'
import { pushOrDelete } from '../common/arrayUtils'
import { format } from '../common/dateFormats'

export const useAddChannel = () => {
  const { showAddChannelModal } = useShowing()
  const { channels } = useChannels()
  const userId = inject('logging-user-id', '')
  const token = inject('token', '')

  /** 初期メンバーを追加する画面の表示 */
  const showAddUsers = ref(false)
  const channelName = ref('')
  const users: Ref<string[]> = ref([])
  const serachName = ref('')

  /** チャンネル名にかぶしがないかチェック */
  const canUseChannelName = computed(() => {
    for (const [id, channel] of channels.value) {
      if (channel.channel_name.indexOf(channelName.value) !== -1) {
        return false
      }
    }

    return true
  })

  const nextStep = () => {
    if (!canUseChannelName.value) {
      return
    }

    showAddUsers.value = true
  }

  /** チャンネルにユーザを追加 */
  const addUser = (addedUserId: string) => {
    pushOrDelete({ array: users.value, data: addedUserId })
    console.log(users.value)
  }

  /** チャンネルの追加 */
  const add = () => {
    if (!canUseChannelName.value) {
      return
    }

    const data = {
      channel_name: channelName,
      create_user: userId,
      created_at: format({ date: null, formatString: null }),
    }

    fetchStoreChannel({ token, body: JSON.stringify(data) })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        channelName.value = ''
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /** モーダルを閉じる */
  const closeModal = () => {
    showAddChannelModal.value = false
    // 全ての値をリセット
    channelName.value = ''
    serachName.value = ''
    showAddUsers.value = false
    users.value = []
  }

  return {
    showAddUsers,
    channelName,
    users,
    serachName,
    canUseChannelName,
    nextStep,
    add,
    addUser,
    closeModal,
  }
}
