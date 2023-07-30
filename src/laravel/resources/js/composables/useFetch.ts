import { BeforeFetchContext, createFetch } from '@vueuse/core';

export const useFetch = () => {
  const fetch = createFetch({
    options: {
      async beforeFetch({ options }) {
        const myToken = '649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV'
        options.headers.Authorization = `Bearer ${myToken}`

        return { options }
      },
    }
  })
}

const sendMessage = () => {
    if (!canSend) {
        return
    }
    // useFetch('api/store/message')
    const fetch = createFetch({
        // baseUrl: 'api',
        options: {
            async beforeFetch({ options }) {
                const myToken = '649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV'
                options.headers.Authorization = `Bearer ${myToken}`

                return { options }
            },
        }
    })

    const post: FetchStoreMessage = {
        channelId: props.channel._id,
        message: message.value,
        userId: 
    }

    const a = fetch('api/store/message').post(post)
    console.log(a)
}