<template>
    <div class="thread">
        <p>
            スレッド
            <span>
                {{ localChannel.channel_name }}
            </span>
        </p>
        <p>
            <!-- {{ Number(props.message.thread.length) }}件の返信 -->
        </p>
        <Message
            :message="localMessage"
            :is-thread="false">
        </Message>
        <Message
            v-for="messageId in localMessage.thread" :key="'thread' + messageId"
            :message="(messages.get(messageId) as Message)"
            :is-thread="false">
        </Message>
        <MessageInput
            :channel="localChannel"
            :message="localMessage">
        </MessageInput>

    </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Message from '../components/Message2.vue'
import MessageInput from '../components/MessageInput.vue'
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';


const { showingChannelId, showingThreadMessageId } = useShowing()
let { messages } = useMessages('message-' + showingChannelId)

const localChannel = ref<Channel>(useChannels().channels.value.get(showingChannelId.value) as Channel)
const localMessage = ref<Message>(useMessages('message-' + showingChannelId.value).messages.value.get(showingThreadMessageId.value) as Message)

watchEffect(() => {
    localChannel.value = useChannels().channels.value.get(showingChannelId.value) as Channel
    messages = useMessages('message-' + showingChannelId.value).messages
    localMessage.value = messages.value.get(showingThreadMessageId.value) as Message
})
</script>
