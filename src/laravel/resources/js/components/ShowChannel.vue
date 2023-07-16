<template>
    <div v-if="channel">
        <p>
            {{ channel.channel_name }}
        </p>
        <p>
            {{ format(new Date(channel.created_at), 'yyyy年MM月dd日') }}、がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
        </p>
        <div>
            <div v-for="[messageId, message] of messages?.messages.value" :key="'message' + messageId">
                {{ messageId }}
            </div>
        </div>
        <div @click="click">
ca.a@
        </div>
    </div>
</template>
<script lang="ts" setup>
import Channel from './Channel.vue';
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { format } from 'date-fns'
import { storeToRefs } from 'pinia';
import { computed, isReactive, ref, watchEffect } from 'vue';
import { watch } from 'fs';

const props = defineProps<{
    channelId: string,
}>()
const a = ref(0)
const channel = useChannels().getChannel(props.channelId)
const messages =  useMessages().getMessages(props.channelId)
console.log('is', isReactive(a))
const click = () => {
    console.log('ckick')
    // useMessages().add(props.channelId)
    useMessages().pushChannel({newChannelKey: 'vanjk.a.v,', newMessages:{}})
    // messages?.messages.value.
}

watchEffect(() => {
    console.log("v;a")
    console.log(messages?.messages)

})
// watch(
//   () => messages,
//   settings => {
//     console.log('The new settings are', settings);
//   },
// );
// const channel = refChannels.channels.value[props.channelId] as TypeChannel
// const messages = refMessages.messagesByChannelId.value[props.channelId] as Message[]

</script>