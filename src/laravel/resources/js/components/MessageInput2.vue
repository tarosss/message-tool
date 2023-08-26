<template>
    <q-editor
        v-model="draft.message"
        :toolbar="toolBar"
        :definitions="definitions"
        :placeholder="props.channel.channel_name + 'へのメッセージ'"
        dark>
    </q-editor>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { mdiSendVariant } from '@mdi/js';
import { useMessage } from '../composables/useMessage'
import { getFetch } from '../common/fetches'
import  { messageStoreUrl } from '../consts/fetches'
import { inject } from 'vue';

const props = defineProps<{
    channel: Channel,
    message?: Message,
}>()

const { draft, dropZone, textZone, textZoneHeight, canSend, isOverDropZone, definitions, toolBar } = useMessage({ channelId: props.channel._id, messageId: props.message?._id })

const logingUserId = inject('loging-user-id', '')
const token = inject('token', '')
const storage = inject('storage', 1)

// const sendMessage = async () => {
//     const fetch = getFetch({token})
//     const posts: FetchStoreMessage[] = [{
//         channelId: props.channel._id,
//         message: draft.value.message,
//         userId: logingUserId,
//         storage: storage,
//     }]

//     const { onFetchResponse, statusCode } = await fetch(messageStoreUrl).post({data: posts})
// }
</script>