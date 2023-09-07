<template>
    <q-list>
        <q-item class="row items-center cursor-pointer">
            <div>
                <q-icon 
                    class="q-mr-sm"
                    name="message" />
                <span>スレッド</span>
            </div>
        </q-item>
        <q-item class="row items-center cursor-pointer">
            <div>
                <q-icon 
                    class="q-mr-sm"
                    name="description" />
                <span>ファイル</span>
            </div>
        </q-item>
        <q-separator />
        <q-expansion-item
            v-model="showChannel"
            switch-toggle-side
            label="チャンネル">
            <LeftNavRow
                v-for="[channelId, channel] in participatingChannels" 
                :key="'chanel' + channelId" 
                :_id="channelId"
                :title="channel.channel_name"
                clickable>
            </LeftNavRow>
            <q-item
                class="row items-center cursor-pointer q-py-lg"
                dense>
                <div>
                    <q-icon
                        class="q-mr-sm"
                        name="add">
                    </q-icon>
                    <span>
                        チャンネルを追加する
                    </span>
                </div>
                <q-menu>
                    <q-list class="q-py-lg">
                        <q-item class="cursor-pointer" >
                            <span @click="showAddChannelModal = true">新しいチャンネルを作成する</span>
                        </q-item>
                        <q-item class="cursor-pointer">
                            <span>チャンネル一覧</span>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-item>
        </q-expansion-item>
        <q-expansion-item
            v-model="showDirectMessages"
            switch-toggle-side
            label="ダイレクトメッセージ">
            <q-item
                class="row items-center cursor-pointer q-py-lg"
                dense>
                <div>
                    <q-icon
                        class="q-mr-sm"
                        name="add">
                    </q-icon>
                    <span @click="showAddDirectMessageModal = true">
                        ダイレクトメッセージをを追加する
                    </span>
                </div>
            </q-item>
        </q-expansion-item>
    </q-list>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import LeftNavTitleRow from './LeftNavTitleRow.vue';
import LeftNavRow from './LeftNavRow2.vue';
import { useChannels } from '../store/channels';
import { useShowing } from '../store/showing';
import { useMessages } from '../store/messages';
import router from '../router'
const workspaceName = 'ワークスペースめい'
const { channels, participatingChannels, directMessages, getChannel } = useChannels()
const { showAddChannelModal, showAddDirectMessageModal } = useShowing()
const selectedDetail = ref('')

const showChannel = ref(true)
const showDirectMessages = ref(true)

</script>
