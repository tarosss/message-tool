import { inject } from 'vue'
import { createFetch } from '@vueuse/core'
import { draftFileDeleteUrl, channelStoreUrl } from '../consts/fetches'

type GetFetch2Args = {
  // headers: {
  //   Authorization: string,
  //   'Content-Type'?: string,
  // },
  token: string,
  body: FormData | string,
  url: string,
  contentType?: string
}

type Body = FormData | string

type FetchAttributes = Omit<GetFetch2Args, 'url' | 'contentType'>

const getContentType = (data: object | FormData) => {
}
export const getFetch = ({ token, contentType }: { token: string, contentType?: string | 'application/json' }) => {
  const fetch = createFetch({
    options: {
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`
        // options.headers.ContentType = contentType
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

export const getFetch2 = ({ body, url, token, contentType }: GetFetch2Args) => {
  const t = contentType ?? 'multipart/form-data'
  const f = fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body,
  })

  return f
}

export const fetchDeleteDraftFile = ({ token, body }:{ token: string, body: Body }) => {
  const f = fetch(draftFileDeleteUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
  })

  return f
}

export const fetchStoreChannel = ({ token, body }: FetchAttributes) => {
  const f = fetch(channelStoreUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
  })

  return f
}
