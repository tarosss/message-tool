<template>
    <div class="left-nav padding-16">
        <div class="left-nav-top padding-bottom-10">
            <div class="left-nav-top-warkspace-name font-20">
                <p class="" @click="selectedDetail='workspace'">{{ workspaceName }} ^</p>
                <div 
                    class="left-nav-top-warkspace-name-detail "
                    :class="{'display-none': selectedDetail != 'workspace'}">
                    
                </div>
            </div>
            <div class="left-nav-top-new-message pointer">
                <span @click="selectedDetail = 'message'">＠</span>
                <div 
                    class="left-nav-top-new-message-detail"
                    :class="{'display-none': selectedDetail != 'message'}">
                </div>
            </div>
        </div>
        <div class="left-nav-channels">
            <LeftNavTitleRow
                class="padding-top-8 padding-bottom-8"
                :title="'チャンネル'" 
                @click="selectedDetail = 'channel'"></LeftNavTitleRow>
            <LeftNavRow 
                v-for="[chanelKey, channel] in refChannels.channels.value" 
                :key="'chanel' + channel._id" 
                :_id="channel._id"
                :title="channel.channel_name">
            </LeftNavRow>
            <div class="left-nav-channels-add pointer">
                チャンネルを追加する
                <div class="left-nav-channels-add-detail">

                </div>
            </div>
        </div>
        <div class="left-nav-direct">
            <LeftNavTitleRow 
                class="padding-top-8 padding-bottom-8"
                :title="'ダイレクトメッセージ'" 
                @click="selectedDetail = 'direct'"></LeftNavTitleRow>
            <!-- FIXME -->

        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import LeftNavTitleRow from './LeftNavTitleRow.vue';
import LeftNavRow from './LeftNavRow.vue';
import { useChannels } from '../store/channels';
import { useShowing } from '../store/showing';
import { useMessages } from '../store/messages';

const workspaceName = 'ワークスペースめい'
const refChannels = storeToRefs(useChannels())
const refShowing = storeToRefs(useShowing())
const selectedDetail = ref('')

// useMessages().set('mvaklmkl')

</script>
../store/old-messages