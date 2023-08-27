<template>
    <div class="show q-pa-lg">
        <ShowChannel
            v-for="[channelId, channel] of channels"
            v-show="showing.component.value === 'channel' && channelId === showing.showingChannelId.value"
            :channel="channel">
        </ShowChannel>
        <ShowNothing v-show="showing.component.value === ''"></ShowNothing>
    </div>
</template>
<script lang="ts" setup>
import { useChannels } from '../store/channels';
import { useShowing } from '../store/showing';
import ShowChannel from './ShowChannel.vue';
import ShowNothing from './ShowNothing.vue'
import essage from './Message.vue'
import { computed, watchEffect } from 'vue';


const showing = useShowing()
const { channels } = useChannels()
</script>
