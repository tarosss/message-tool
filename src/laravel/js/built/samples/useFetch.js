import { ref, unref, isRef, watchEffect } from 'vue'
export function useFetch(url) {
  const data = ref('vaklmm')
  const error = ref(null)
  const a = 1
  console.log(unref(a))
  const a_b = 's'
  const b = {
    a_b: 's',
  }
  const doFetch = () => {
    console.log(`do-fetch ${unref(url)}`)
  }
  if (isRef(url)) {
    watchEffect(doFetch)
  } else {
    doFetch()
  }
  return { data, error }
}
//# sourceMappingURL=useFetch.js.map
