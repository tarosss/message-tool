import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsers = defineStore('users', () => {
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
