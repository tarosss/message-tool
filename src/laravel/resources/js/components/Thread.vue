<template>
    <div class="thread">
        <q-toolbar class="glossy text-white row">
            <span class="text-h5">
                スレッド
            </span>
            <span class="text-h6 text-grey">
                {{ displayChannelName() }}
            </span>
            <q-space></q-space>
            <q-btn 
                icon="close" 
                flat 
                @click="setShowThread(false)">
            </q-btn>
        </q-toolbar>
        <p>
            {{ Number(localMessage.thread.length) }}件の返信
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
import { ref, watchEffect, inject } from 'vue'
import Message from '../components/Message2.vue'
import MessageInput from '../components/MessageInput2.vue'
import { useShowing } from '../store/showing'
import { useUsers } from '../store/users'
import { useChannels } from '../store/channels'
import { useMessages } from '../store/messages'

const loggingUserId = inject('logging-user-id', '')

const { showingChannelId, showingThreadMessageId, setShowThread } = useShowing()
let { messages } = useMessages('message-' + showingChannelId)

const localChannel = ref<Channel>(useChannels().channels.value.get(showingChannelId.value) as Channel)
const localMessage = ref<Message>(useMessages('message-' + showingChannelId.value).messages.value.get(showingThreadMessageId.value) as Message)

const displayChannelName = ()  => {
    if (localChannel.channel_type === 1) {
        return localChannel.channel_name
    }

    if (localChannel.channel_type === 2) {
        return 'ダイレクト'
    }

    const { users } = useUsers()
    return users.value.get(loggingUserId).user_name
}

watchEffect(() => {
    localChannel.value = useChannels().channels.value.get(showingChannelId.value) as Channel
    messages = useMessages('message-' + showingChannelId.value).messages
    localMessage.value = messages.value.get(showingThreadMessageId.value) as Message
})
</script>
