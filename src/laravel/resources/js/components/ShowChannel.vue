<template>
    <div v-if="channel">
        <p>
            {{ channel.channel_name }}
        </p>
        <p>
            {{ format(new Date(channel.created_at), 'yyyy年MM月dd日') }}、がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
        </p>
        <div>
            <div v-for="[messageId, message] of messages.messages" :key="'message' + messageId">
                {{ messageId }}
                {{ message.message }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';
import { format } from 'date-fns'
import { storeToRefs } from 'pinia';

const props = defineProps<{
    channelId: string,
}>()

const refShowing = storeToRefs(useShowing())
const channel = computed(() => useChannels().getChannel(refShowing.showing.value))
const messages =  computed(() => useMessages('message-' + refShowing.showing.value))

// watchEffect(() => {
//     channel = useChannels().getChannel(refShowing.showing.value)
//     messages =  useMessages('message-' + refShowing.showing.value)
// })

// watchEffect(() => {
//     console.log(refShowing.showing.value)
// })
// console.log(channel)
</script>