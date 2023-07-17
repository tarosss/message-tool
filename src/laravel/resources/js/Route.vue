<template>
  <Header></Header>
  <Body></Body>
  <router-link to="/"></router-link>
  <!-- <router-link to="/about"></router-link> -->
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import { useChannels } from './store/channels';
import { useMessages } from './store/messages';
const props = defineProps<{
  userId: string,
}>()

onBeforeMount(()=> {

  const promise = Promise.all([
    useFetch('/api/channel').post({})
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useChannels().setChannels(json.channels)
      }),
    useFetch('api/message').post({
      userId: props.userId, 
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


  // promise.then(v => {
  //   const channels = useChannels()
  //   const s = storeToRefs(channels)
    
  //   channels.setChannels(v[0])
  // })
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
./store/messages