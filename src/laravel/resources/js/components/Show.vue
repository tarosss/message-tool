<template>
    <div>
        <ShowChannel 
            v-for="[chanelKey] in refChannels.channels.value"
            :channelId="chanelKey">
            
        </ShowChannel>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useChannels } from '../store/channels';
import { useShowing } from '../store/showing';
import ShowChannel from './ShowChannel.vue';
import { computed, watchEffect } from 'vue';

const refShowing = storeToRefs(useChannels())
const refChannels = storeToRefs(useChannels())
</script>../store/old-messages