import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { oneOrMore } from '../common/regularExpression'

export const store = defineStore('users', () => {
  const users = ref(new Map<string, User>())

  const getUser = (userId: string) => users.value.get(userId)

  const setUsers = (usersObject: FetchUser) => {
    users.value = new Map<string, User>(Object.entries(usersObject))
  }

  const serachUsers = (serach: string | number | null) => {
    if (serach === null || !oneOrMore(serach)) {
      return Array.from(users.value)
    }

    const temp: [string, User][] = []
    for (const [userId, user] of users.value) {
      if (user.display_name.indexOf(String(serach)) !== -1) {
        temp.push([userId, user])
      }
    }

    return temp
  }

  return {
    users: computed(() => users.value),
    getUser,
    setUsers,
    serachUsers,
  }
})

export const useUsers = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
