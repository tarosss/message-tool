import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

export const store = defineStore('users', () => {
  const users = ref(new Map<string, User>())

  const getUser = (userId: string) => users.value.get(userId)
  const setUsers = (usersObject: FetchUser) => {
    users.value = new Map<string, User>(Object.entries(usersObject))
  }


  return {
    users: computed(() => users.value),
    getUser,
    setUsers,
  }
})

export const useUsers = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
