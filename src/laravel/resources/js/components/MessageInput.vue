<template>
    <div class="message-input" ref="dropZone" style="background-color: blue;">
        <textarea
            v-model="draft.message"
            ref="textZone"
            rows="1"
            :placeholder="props.channel.channel_name + 'へのメッセージ'"
            :style="{
                height: textZoneHeight,
            }">
        </textarea>
        <div class="message-input-footer">
            <div>
                
            </div>
            <p>
                <i class="bi bi-send" @click="sendMessage"></i>
            </p>
        </div>

        <!-- <div v-for="file in files" :key="file.name">
            {{ file.name }}
        </div> -->
        <input type="file" class="message-input-file">
    </div>
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

const { draft, dropZone, textZone, textZoneHeight, canSend, isOverDropZone, sendMessage } = useMessage({ channelId: props.channel._id, messageId: props.message?._id })


const logingUserId = inject('logging-user-id', '')
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