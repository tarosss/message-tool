import { computed, inject, ref, Ref } from 'vue'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'
import { fetchUpdateChannel } from '../common/fetches'
import { deepCopy } from '../common/objectUtils'

export const useChannelDialog = () => {
  const token = inject('token', '')
  const { channelDialogChannelId, showChannelDialog, setRightContent } = useShowing()
  const { channels } = useChannels()
  const { users } = useUsers()

  const targetChannel = computed(() => channels.value.get(channelDialogChannelId.value) as Channel)
  const createUser = computed(() => users.value.get(targetChannel.value.create_user) as User)
  const tab = ref('channel')
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
  /** 追加されるユーザ */
  const addedUsers: Ref<string[]> = ref([])
  const addedUsersLength = computed(() => addedUsers.value.length)
  const showAddUserDialog = () => {
    addUserDialog.value = true
  }

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
    if (addedUsers.value.includes(addedUser._id)) {
      addedUsers.value = addedUsers.value.filter((uid) => {
        return uid !== addedUser._id
      })
    } else {
      addedUsers.value.push(addedUser._id)
    }
  }

  const clickAddUser = () => {
    if (!addedUsersLength.value) {
      return
    }

    const postData = deepCopy<Channel>(targetChannel.value)

    postData.users.push(...addedUsers.value)
    fetchUpdateChannel({ token, body: JSON.stringify(postData) })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }

        // 変更に成功したらダイアログを非表示にする
        showChannelDialog.value = false
        addUserDialog.value = false
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return {
    targetChannel,
    createUser,
    tab,
    searchName,
    participatingUsers,
    addUserDialogSearchName,
    targetParticipatingUsers,
    targetNotParticipatingUsers,
    addUserDialog,
    addedUsers,
    addedUsersLength,
    showAddUserDialog,
    addUser,
    clickAddUser,
  }
}
