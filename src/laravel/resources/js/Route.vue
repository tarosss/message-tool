<template>
  <Header></Header>
  <Body v-if="show" :loging-user-id="props.logingUserId"></Body>
  <router-link to="/"></router-link>
  <!-- <router-link to="/about"></router-link> -->
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, provide, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { getFetch } from './common/fetches';
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import { useLoging } from './store/loging';
import { useUsers } from './store/users';
import { useChannels } from './store/channels'
import { useMessages } from './store/messages'
import { useDrafts } from './store/drafts'
import { useReactions } from './store/reactions'
import { reactionGetUrl, draftGetUrl } from './consts/fetches'
const props = defineProps<{
 logingUserId: string,
 token: string,
}>()

const showFlags = ref({
  message: false,
  draft: false,
  user: false,
  reaction: false,
  channel: false,
})

provide('loging-user-id', props.logingUserId)
provide('token', props.token)
provide('storage', 1)

onBeforeMount(()=> {
  Promise.all([
    useFetch('/api/user').post({})
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useUsers().setUsers(json.users)
        showFlags.value.user = true
      }),
    useFetch('/api/channel').post({})
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useChannels().setChannels(json.channels)
        showFlags.value.channel = true

      }),
    useFetch('api/message').post({
      userId: props.logingUserId, 
      by: 'channel_id', 
      messageKey: '_id',
    })
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        for (const [channelId, messageByMessageId] of Object.entries(json.messages as FetchMessage)) {
          useMessages('message-' + channelId).setMessages(messageByMessageId)
        }
        showFlags.value.message = true

      }),

    getFetch({ token: props.token})(reactionGetUrl).post({
      by: '_id'
    })
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useReactions().setReactions({newReactions: json.reactions})
        showFlags.value.reaction = true
      }),

    getFetch({ token: props.token})(draftGetUrl).post({
      userId: props.logingUserId
    })
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useDrafts().setDrafts(json.drafts)
        showFlags.value.draft = true
      }),
  ])
})

const show = computed(() => {
  for(const [key, value] of Object.entries(showFlags.value)) {
    if (!value) {
      return false
    }
  }

  return true
})
// import { defineProps } from 'vue';
// props = defineProps

// const props = defineProps<{
//     data: {
//         _id: string,
//         message: string,
//         storage: string,
//         sended: string,
//         created_at: string,
//         updated_at: string,
//     }[]
// }>()
// console.log(props.data);
</script>
