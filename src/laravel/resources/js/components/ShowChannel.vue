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
        <div @click="click">
ca.a@
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { format } from 'date-fns'
import { storeToRefs } from 'pinia';
import { computed, isReactive, ref, watchEffect } from 'vue';

const props = defineProps<{
    channelId: string,
}>()

const channel = useChannels().getChannel(props.channelId)
const messages =  useMessages('message-' + props.channelId)

const click = () => {
}
</script>