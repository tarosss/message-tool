import { createFetch } from '@vueuse/core';

export const getFetch = ({ token }: { token: string }) => {
  const fetch = createFetch({
    options: {
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`

        return { options }
      },
      onFetchError: (response) => {
        console.log('onFetchError')
        return response
      },
    },
  })

  return fetch
}
