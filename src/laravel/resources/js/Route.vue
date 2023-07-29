<template>
  <Header></Header>
  <Body :loging-user-id="props.logingUserId"></Body>
  <router-link to="/"></router-link>
  <!-- <router-link to="/about"></router-link> -->
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, provide } from 'vue';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import { useLoging } from './store/loging';
import { useUsers } from './store/users';
import { useChannels } from './store/channels';
import { useMessages } from './store/messages';
const props = defineProps<{
 logingUserId: string,
}>()

provide('loging-user-id', props.logingUserId)
provide('token', '649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV')
provide('storage', 1)

onBeforeMount(()=> {
  Promise.all([
    useFetch('/api/user').post({})
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useUsers().setUsers(json.users)
      }),
    useFetch('/api/channel').post({})
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useChannels().setChannels(json.channels)
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
      })
  ])
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
