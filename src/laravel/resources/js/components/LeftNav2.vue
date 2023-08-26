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
            icon="circle"
            label="チャンネル">
            <LeftNavRow
                v-for="[chanelKey, channel] in channels.channels.value" 
                :key="'chanel' + channel._id" 
                :_id="channel._id"
                :title="channel.channel_name"
                clickable>
            </LeftNavRow>
            <q-item 
                class="row items-center cursor-pointer"
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
const channels = useChannels()
const selectedDetail = ref('')

const showChannel = ref(true)
// useMessages().set('mvaklmkl')

// const click = (path: string) => {
//     router.push(path)
// }
</script>
