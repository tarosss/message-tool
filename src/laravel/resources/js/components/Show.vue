<template>
    <div class="show">
        <ShowChannel
            v-for="channelId of refChannels.channelIds.value"
            v-show="refShowing.component.value === 'channel' && channelId === refShowing.showing.value"
            :channelId="channelId">
        </ShowChannel>
        <ShowNothing v-show="refShowing.component.value === ''"></ShowNothing>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useChannels } from '../store/channels';
import { useShowing } from '../store/showing';
import ShowChannel from './ShowChannel.vue';
import ShowNothing from './ShowNothing.vue'
import essage from './Message.vue'
import { computed, watchEffect } from 'vue';


const refShowing = storeToRefs(useShowing())
const refChannels = storeToRefs(useChannels())

console.log(refChannels.channelIds.value)
// sample[0] = ShowChannel
</script>
