import { computed, ref, Ref } from 'vue'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'

export const useChannelDialog = () => {
  const { channelDialogChannelId, setRightContent } = useShowing()
  const { channels } = useChannels()
  const { users } = useUsers()

  const targetChannel = computed(() => channels.value.get(channelDialogChannelId.value) as Channel)
  const tab = ref('')
  const searchName = ref('')
  /** 参加しているユーザをあらかじめ取得しておく */
  const participatingUsers = computed(() => {
    const u = new Map<string, User>()
    for (const userId of targetChannel.value.users) {
      u.set(userId, users.value.get(userId) as User)
    }

    return u
  })

  /** 参加していないユーザ */
  const notParticipatingUsers = computed(() => {
    const u = new Map<string, User>()
    for (const [userId, user] of users.value) {
      if (targetChannel.value.users.includes(userId)) {
        continue
      }

      u.set(userId, user)
    }

    return u
  })

  /** ユーザ名に該当するユーザのみを取得 */
  const targetParticipatingUsers = computed(() => {
    if (searchName.value === '') {
      return participatingUsers.value
    }

    const u = new Map<string, User>()
    for (const [userId, user] of participatingUsers.value) {
      if (user.display_name.includes(searchName.value)) {
        u.set(userId, user)
      }
    }

    return u
  })

  /** ユーザ登録用のダイアログのフラグ */
  const addUserDialog = ref(false)
  /** ユーザ参加ダイアログの名前検索 */
  const addUserDialogSearchName = ref('')

  const targetNotParticipatingUsers = computed(() => {
    if (addUserDialogSearchName.value === '') {
      return notParticipatingUsers.value
    }

    const u = new Map<string, User>()
    for (const [userId, user] of notParticipatingUsers.value) {
      if (user.display_name.includes(addUserDialogSearchName.value)) {
        u.set(userId, user)
      }
    }

    return u
  })

  /**
   * ユーザをチャンネルに追加する
   */
  const addUser = (addedUser: User) => {
    console.log(addedUser)
  }

  return {
    targetChannel,
    tab,
    searchName,
    participatingUsers,
    addUserDialogSearchName,
    targetParticipatingUsers,
    targetNotParticipatingUsers,
    addUserDialog,
    addUser,
  }
}
