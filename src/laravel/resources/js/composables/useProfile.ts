import { ref, computed } from 'vue'
import { useLogging } from '../store/logging'
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'

export const useProfile = () => {
  const { loggingUser } = useLogging()
  const { showing, profileUserId, setShowing, setShowingChannelId } = useShowing()
  const { users } = useUsers()
  const { getDirectMessageChannelId } = useChannels()
  const user = computed(() => users.value.get(profileUserId.value))

  const startDm = (userId: string) => {
    const id = getDirectMessageChannelId(loggingUser.value._id, userId)
    if (id === undefined) {
      return
    }

    setShowingChannelId(id)
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
  }

  return {
    user,
    startDm,
    copyEmail,
  }
}
