import { computed, ref, Ref, watch , inject } from 'vue'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { fetchStoreChannel } from '../common/fetches'
import { format } from '../common/dateFormats'
// import { ChannelType } from '../consts/channel'

export const useAddChannel = () => {
  const { showAddChannelModal } = useShowing()
  const { channels, pushChannel } = useChannels()
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
      if (channelName.value == channel.channel_name) {
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
    if (users.value.includes(addedUserId)) {
      // 取り除く
      users.value = users.value.filter((d) => {
        return d !== addedUserId
      })
    } else {
      // 追加
      users.value.push(addedUserId)
    }
  }

  /** チャンネルの追加 */
  const add = () => {
    if (!canUseChannelName.value) {
      return
    }

    const data = {
      channel_type: 1,
      channel_name: channelName.value,
      create_user: userId,
      users: Array.from(new Set([userId].concat(users.value))),
      created_at: format({ date: null, formatString: null }),
    }

    fetchStoreChannel({ token, body: JSON.stringify(data) })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }

        return res.json()
      })
      .then((res) => res.channel as Channel)
      .then((channel) => {
        // モーダル非表示
        showAddChannelModal.value = false
        // リセット
        channelName.value = ''
        users.value = []
        showAddUsers.value = false
        // チャンネルストアに追加
        pushChannel({ newChannel: channel })
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
