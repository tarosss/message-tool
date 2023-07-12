<template>
    <div class="left-nav padding-16">
        <div class="left-nav-top padding-bottom-10">
            <div class="left-nav-top-warkspace-name font-20">
                <p class="">{{ workspaceName }} ^</p>
                <div class="left-nav-top-warkspace-name-detail display-none">
                    
                </div>
            </div>
            <div class="left-nav-top-new-message pointer">
                <span>＠</span>
                <div class="left-nav-top-new-message-detail display-none"></div>
            </div>
        </div>
        <div class="left-nav-channels">
            <LeftNavTitleRow :title="'チャンネル'"></LeftNavTitleRow>
            <LeftNavRow v-for="channel in storeChannels.channels.value" :key="'chanel' + channel._id" :title="channel.channel_name">

            </LeftNavRow>
            <!-- <div v-for="channel in storeChannels.channels.value" :key="'chanel' + channel._id">
                {{ channel._id }}
            </div> -->
        </div>


    </div>
</template>
<script lang="ts" setup>
import LeftNavTitleRow from './LeftNavTitleRow.vue';
import LeftNavRow from './LeftNavRow.vue';
import { storeToRefs } from 'pinia';
import { useChannels } from '../store/channels';
import { useSample } from '../store/sample'
import { onMounted, watchEffect } from 'vue';

const workspaceName = 'ワークスペースめい'
const storeChannels = storeToRefs(useChannels())

watchEffect(() => {
    console.log(storeChannels.channels.value)
})

</script>
