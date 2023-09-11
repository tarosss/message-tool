<template>
    <div class="body-channel padding-top-10 row justify-end" style="height: 100%">
        <q-toolbar class="body-channel-header col-12">
            <q-toolbar-title class="font-16">
               # {{ displayChannelName }}
            </q-toolbar-title>
            <Avatar
                v-if="isNormalChannel"
                :user="loggingUser"
                :size="25"
                class="q-mr-sm"
                @click="clickChannelAvatar(props.channel._id)">
            </Avatar>
            <span>{{ props.channel.users.length }}</span>
        </q-toolbar>
        <div
            v-if="isNormalChannel"
            class="margin-bottom-30 col-12">
            <p class="font-20">
                # {{ displayChannelName }}
            </p>
            <p>
                {{ specialFormat(props.channel.created_at) }}、
                {{ channelCreateUserDisplayName }} がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
            </p>
        </div>
        <div v-else class="col-12">
            <div>
                <Avatar
                    :user="loggingUser">
                </Avatar>
                <span
                    class="cursor-pointer"
                    @click="showProfile">
                    {{ displayChannelName }}
                </span>
            </div>
            <p v-if="isMemo">
                <b>ここはあなただけのスペースです。 </b>
            </p>
            <p v-else>
                この会話は @t.ukaiさんとの 2 人だけに公開されています。もっとよく知り合うため、プロフィールをチェックしてみましょう。
            </p>
        </div>
        <div class="body-channel-messages-by-day-wrapper col-12" ref="htmlElement">
            <div class="body-channel-messages-by-day q-py-lg relative-position"
                v-for="[date, messageIds] of messageIdsByDay">
                <span class="body-channel-messages-by-day-date pointer absolute-top-center"> 
                    {{ specialFormat(date, true) }} 
                </span>
                <Message 
                    v-for="messageId of messageIds" 
                    :key="'show-message-' + messageId"
                    :message="(messages.get(messageId) as Message)">
                </Message>
            </div>
        </div>
        <div class="col-12">
            <MessageInput
                :channel="props.channel">
            </MessageInput>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ChannelDialog from '../components/ChannelDialog.vue'
import { onUpdated, inject, computed, onMounted, ref, watchEffect } from 'vue';
import Message from './Message2.vue'
import MessageInput from './MessageInput2.vue'
import Avatar from './Avatar.vue';
import { useLogging } from '../store/logging'
import { useShowing } from '../store/showing';
import { useShowChannel } from '../composables/useShowChannel'
import { specialFormat } from '../common/dateFormats'

const props = defineProps<{
    channel: Channel,
}>()

const { loggingUser } = useLogging()
const { 
    channelCreateUserDisplayName, 
    messages, 
    messageIdsByDay, 
    htmlElement,
    displayChannelName,
    isNormalChannel,
    isMemo,
    showProfile,
    clickChannelAvatar,
} = useShowChannel(props.channel)

const tab = ref('')
</script>