import { ref, watch, computed, inject } from 'vue'
import { useUsers } from '../store/users'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { fetchCreateChannel } from '../common/fetches'

export const useAddDirectMessage = () => {
  const token = inject('token', '')
  const loggingUserId = inject('logging-user-id', '')

  const { users } = useUsers()
  const { showAddDirectMessageModal } = useShowing()
  const { userIdsAlreadyCreatedDirectMessage } = useChannels()
  /** ユーザ一覧を表示する */
  const showSerachUsers = ref(false)

  const serachName = ref('')
  const anotherUserId = ref('')
  /** 作成できるかどうかのフラグ */
  const canCreateDirectMessage = computed(() => anotherUserId.value !== '' && users.value.get(anotherUserId.value))

  const selectAnotherUser = (userId: string) => {
    if (userIdsAlreadyCreatedDirectMessage.value.includes(userId)) {
      // すでにダイレクトメッセージが作成されているユーザ
      return
    }

    anotherUserId.value = userId
    showSerachUsers.value = false
  }

  const anotherUser = computed(() => users.value.get(anotherUserId.value))

  const createDirectMessage = () => {
    if (!canCreateDirectMessage.value) {
      return
    }

    // 送信先
    const channelType = loggingUserId === anotherUserId.value ? 3 : 2
    const json = {
      channel_type: channelType,
      create_user: loggingUserId,
      channel_name: `${loggingUserId} ${anotherUserId.value}のダイレクトメッセージ`,
      users: Array.from(new Set([loggingUserId, anotherUserId.value])),
    }

    fetchCreateChannel({ token, body: JSON.stringify(json) })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        // 作成に成功したらモーダルウィンドウを消す
        showAddDirectMessageModal.value = false
        return res.json()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  /** 検索名が変更されるたびにユーザリストを表示する */
  watch(serachName, () => {
    if (serachName.value === '') {
      // 検索名が何もない場合はなにもしない
      return
    }

    showSerachUsers.value = true
  })

  return {
    showSerachUsers,
    serachName,
    anotherUser,
    anotherUserId,
    canCreateDirectMessage,
    selectAnotherUser,
    createDirectMessage,
  }
}
