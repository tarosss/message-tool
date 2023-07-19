<template>
    <div v-if="channel" class="body-channel padding-top-10">
        <div class="body-channel-header">
            <p class="font-20">
               # {{ channel.channel_name }}
            </p>
            <div class="body-channel-header-right">
                <div class="body-channel-header-right-members">
                    <p class="body-channel-header-right-members-icon"></p>
                </div>
            </div>
        </div>
        <p>
            {{ format(new Date(channel.created_at), 'yyyy年MM月dd日') }}、
            {{ channelCreateUserDisplayName }} がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
        </p>
        <div v-for="[date, messageIds] of messages.messageIdsByDay">
            <p> {{ specialFormat(date) }} </p>
            <Message v-for="messageId of messageIds" :key="'message' + messageId"
                :message="(messages.messages.get(messageId) as Message)">
            </Message>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useUsers } from '../store/users';
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';
import { format, isThisYear } from 'date-fns'
import { storeToRefs } from 'pinia';
import Message from './Message.vue'
const props = defineProps<{
    logingUserId: string,
    channelId: string,
}>()

const users = useUsers()
const refUsers = storeToRefs(users)
const refShowing = storeToRefs(useShowing())
const channel = computed(() => useChannels().getChannel(refShowing.showing.value))
const messages =  computed(() => useMessages('message-' + refShowing.showing.value))

const channelCreateUserDisplayName = computed(() => {
    if (channel.value.create_user === props.logingUserId) {
        return 'あなた'
    }

    return refUsers.users.value.get(props.logingUserId)?.display_name + 'さん'
})

const specialFormat = (date: string) => {
    const tempDate = new Date(date)
    const dateFormat = isThisYear(tempDate) ? 'MM月dd日' : 'yyyy年MM月dd日'

    return format(tempDate, dateFormat)
}

const getMessage = (messageId: string) => {
    return messages.value.messages.get(messageId) as Message
}

</script>