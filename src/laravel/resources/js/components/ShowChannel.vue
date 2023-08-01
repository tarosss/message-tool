<template>
    <div v-if="channel" class="body-channel padding-top-10">
        <div class="body-channel-header">
            <p class="font-16">
               # {{ channel.channel_name }}
            </p>
            <div class="body-channel-header-right">
                <div class="body-channel-header-right-members">
                    <p class="body-channel-header-right-members-icon"></p>
                </div>
            </div>
        </div>
        <div class="margin-bottom-30">
            <p class="font-20">
                # {{ channel.channel_name }}
            </p>
            <p>
                {{ specialFormat(channel.created_at) }}、
                {{ channelCreateUserDisplayName }} がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
            </p>
        </div>
        <div class="body-channel-messages-by-day-wrapper" ref="htmlElement">
            <div class="body-channel-messages-by-day"
                v-for="[date, messageIds] of messages.messageIdsByDay">
                <p class="body-channel-messages-by-day-date pointer"> 
                    {{ specialFormat(date, true) }} 
                </p>
                <Message v-for="messageId of messageIds" :key="'message' + messageId"
                    :message="(messages.messages.get(messageId) as Message)">
                </Message>
            </div>
        </div>
        <div>
            <MessageInput
                :channel="channel">
            </MessageInput>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onUpdated, inject } from 'vue';
import { storeToRefs } from 'pinia';
import Message from './Message.vue'
import MessageInput from './MessageInput.vue'
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useUsers } from '../store/users';
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';
import { useScrollIntoViewOnce } from '../composables/useScrollIntoViewOnce'
import { specialFormat } from '../common/dateFormats'
const props = defineProps<{
    channelId: string,
}>()

const logingUserId = inject('loging-user-id', '')
const users = useUsers()
const refUsers = storeToRefs(users)
const refShowing = storeToRefs(useShowing())
const channel = computed(() => useChannels().getChannel(refShowing.showing.value))
const messages =  computed(() => useMessages('message-' + refShowing.showing.value))
const { htmlElement, bottom } = useScrollIntoViewOnce()

onUpdated(() => {
    if (props.channelId === refShowing.showing.value) {
        // 表示中のものだけ実行する
        console.log(props.channelId + 'update')
        bottom()
    }
})

const channelCreateUserDisplayName = computed(() => {
    if (channel.value.create_user === logingUserId) {
        return 'あなた'
    }

    return refUsers.users.value.get(logingUserId)?.display_name + 'さん'
})

</script>