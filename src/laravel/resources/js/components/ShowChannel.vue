<template>
    <div class="body-channel padding-top-10 row justify-end" style="height: 100%">
        <q-toolbar class="body-channel-header col-12">
            <q-toolbar-title class="font-16">
               # {{ displayChannelName }}
            </q-toolbar-title>
            <Avatar
                :user="loggingUser"
                :size="25"
                class="q-mr-sm"
                @click="showChannelDialog = true">
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
    <q-dialog v-model="showChannelDialog">
        <q-card class="body-channel-dialog">
            <q-toolbar>
                <q-toolbar-title class="font-16">
                    # {{ displayChannelName }}
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn
                    icon="close"
                    flat
                    @click="showChannelDialog = false">
                </q-btn>
            </q-toolbar>
            <q-tabs
                v-model="tab"
                align="justify"
                narrow-indicator
                class="q-mb-lg">
                <q-tab class="text-purple" name="channel" label="チャンネル情報" />
                <q-tab class="text-orange" :name="'users' + props.channel.users.length" label="メンバー" />
            </q-tabs>
            <q-tab-panels v-model="tab"  class="text-dark text-center">
                <q-tab-panel name="channel">
                    <q-card 
                        class="cursor-pointer text-left q-mb-lg"
                        flat>
                        <q-card-section class="row justify-between"> 
                            <div class="row">
                                <span
                                    class="font-bold col-12">
                                    チャンネル名
                                </span>
                                <span class="col-12">
                                    {{ displayChannelName }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>

                        </q-card-section>
                    </q-card>
                    <q-card 
                        class="cursor-pointer q-mb-sm"
                        flat>
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    トピック
                                </span>
                                <span class="col-12">
                                    {{ props.channel.topic ?? 'トピックを追加する' }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>
                        </q-card-section>
                        <q-separator />
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    説明
                                </span>
                                <span class="col-12">
                                    {{ props.channel.description ?? '説明を追加する' }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>
                        </q-card-section>
                        <q-separator />
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    作成者
                                </span>
                                <span class="col-12">
                                    {{ props.channel.create_user }}さんが{{ props.channel.created_at }}に作成
                                </span>
                            </div>
                        </q-card-section>
                    </q-card>
                    <q-card flat>
                        <q-card-section class="text-left">
                            <span>
                                ファイル
                            </span>
                        </q-card-section>
                    </q-card>
                </q-tab-panel>
                <q-tab-panel name="users">
                    <div class="text-h6">Mails</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { onUpdated, inject, computed, onMounted, ref, watchEffect } from 'vue';
import Message from './Message2.vue'
import MessageInput from './MessageInput2.vue'
import Avatar from './Avatar.vue';
import { useLogging } from '../store/logging'
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
} = useShowChannel(props.channel)

const showChannelDialog = ref(false)
const tab = ref('')
</script>