<template>
  <Header></Header>
  <Body v-if="show" ></Body>
  <AddChannel></AddChannel>
  <AddDirectMessage></AddDirectMessage>
  <ChannelDialog></ChannelDialog>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, provide, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { getFetch } from './common/fetches';
import Header from './components/Header2.vue'
import Body from './components/Body.vue'
import AddChannel from './components/AddChannel.vue'
import AddDirectMessage from './components/AddDirectMessage.vue'
import ChannelDialog from './components/ChannelDialog.vue'
import { useLogging } from './store/logging';
import { useUsers } from './store/users';
import { useChannels } from './store/channels'
import { useMessages } from './store/messages'
import { useFiles } from './store/files'
import { useDrafts } from './store/drafts'
import { useReactions } from './store/reactions'
import { reactionGetUrl, draftGetUrl } from './consts/fetches'
import { fetchGetFile } from './common/fetches'

const props = defineProps<{
 loggingUserId: string,
 token: string,
}>()

const showFlags = ref({
  message: false,
  draft: false,
  user: false,
  reaction: false,
  channel: false,
  files: false
})

provide('logging-user-id', props.loggingUserId)
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
      userId: props.loggingUserId, 
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
      userId: props.loggingUserId
    })
      .then(res => res.data.value)
      .then(jsonText => JSON.parse(jsonText as string))
      .then(json => {
        useDrafts().setDrafts(json.drafts)
        showFlags.value.draft = true
      }),
    fetchGetFile({ token: props.token })
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      useFiles().setFiles(json.files)
      showFlags.value.files = true
    })
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
./store/logging