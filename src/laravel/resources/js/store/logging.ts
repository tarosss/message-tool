import { computed, ref, inject } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUsers } from './users'

const store = defineStore('logging', () => {
  const loggingUserId = inject('logging-user-id', '')
  const { getUser } = useUsers()
  const loggingUser = computed(() => getUser(loggingUserId) as User)

  return {
    loggingUser,
  }
})

export const useLogging = () => {
  const s = store()

  return {
    ...s,
    ...storeToRefs(s),
  }
}
