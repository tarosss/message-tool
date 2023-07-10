import { useLocalStorage } from '@vueuse/core'

export function test() {
  const store = useLocalStorage('msssss92', {
    name: 'name1',
    name2: 'name2',
  })

  const setName = (newName: string) => {
    store.value.name = newName
  }
  return {store, setName}
}
