<template>
    <div v-if="props.channel" class="body-channel padding-top-10">
        <div class="body-channel-header">
            <p class="font-16">
               # {{ props.channel.channel_name }}
            </p>
            <div class="body-channel-header-right">
                <div class="body-channel-header-right-members">
                    <p class="body-channel-header-right-members-icon"></p>
                </div>
            </div>
        </div>
        <div class="margin-bottom-30">
            <p class="font-20">
                # {{ props.channel.channel_name }}
            </p>
            <p>
                {{ specialFormat(props.channel.created_at) }}、
                {{ channelCreateUserDisplayName }} がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
            </p>
        </div>
        <div class="body-channel-messages-by-day-wrapper" ref="htmlElement">
            <div class="body-channel-messages-by-day"
                v-for="[date, messageIds] of messages.messageIdsByDay.value">
                <p class="body-channel-messages-by-day-date pointer"> 
                    {{ specialFormat(date, true) }} 
                </p>
                <Message v-for="messageId of messageIds" :key="'message' + messageId"
                    :message="(messages.messages.value.get(messageId) as Message)">
                </Message>
            </div>
        </div>
        <div>
            <MessageInput
                :channel="props.channel">
            </MessageInput>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onUpdated, inject } from 'vue';
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
    channel: Channel,
}>()
const logingUserId = inject('loging-user-id', '')
const users = useUsers()
const showing = useShowing()
const channel = computed(() => useChannels().getChannel(showing.showing.value))
const messages =  computed(() => useMessages('message-' + showing.showing.value))
const { htmlElement, bottom } = useScrollIntoViewOnce()

onUpdated(() => {
    if (props.channel._id === showing.showing.value) {
        // 表示中のものだけ実行する
        bottom()
    }
})

const channelCreateUserDisplayName = computed(() => {
    if (props.channel.create_user === logingUserId) {
        return 'あなた'
    }

    return users.users.value.get(logingUserId)?.display_name + 'さん'
})

</script>