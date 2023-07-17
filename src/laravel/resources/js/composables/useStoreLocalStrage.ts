// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocalStorage } from '@vueuse/core'

type InitialValue = {
  [k in number | string]: any
}

export function useStoreLocalStrage<U extends InitialValue>(key: string, data: U): RemovableRef {
  const state = useLocalStorage(key, data)

  return state
}
