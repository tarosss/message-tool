<template>
    <div>
        <p>
            {{ channel._id }}
        </p>
        <p>
            {{ format(new Date(channel.created_at), 'yyyy年MM月dd日') }}、がこのチャンネルを作成しました。{{ props.channelName }}チャンネルをどんどん活用していきましょう！ 
        </p>
        <div>
            <div v-for="message in messages" :key="'message' + message._id">
                {{ message.message }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Channel from './Channel.vue';
import { useChannels, Channel as TypeChannel } from '../store/channels';
import { useMessages, Message } from '../store/messages';
import { format } from 'date-fns'
import { storeToRefs } from 'pinia';

const props = defineProps<{
    channelId: string,
}>()

const refChannels = storeToRefs(useChannels())
const refMessages = storeToRefs(useMessages())
const channel = refChannels.channels.value[props.channelId] as TypeChannel
const messages = refMessages.messagesByChannelId.value[props.channelId] as Message[]

</script>