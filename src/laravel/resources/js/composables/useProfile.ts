import { ref, computed } from 'vue'
import { useShowing } from '../store/showing'
import { useUsers } from '../store/users'

export const useProfile = () => {
  const { showing, profileUserId } = useShowing()
  const { users } = useUsers()
  const user = computed(() => users.value.get(profileUserId.value))

  return {
    user,
  }
}
