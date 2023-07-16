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
import { useMessages } from '../store/messages';
import ShowChannel from './ShowChannel.vue';
import { computed, watchEffect } from 'vue';

const refShowing = storeToRefs(useChannels())
const refChannels = storeToRefs(useChannels())
const refMessages = storeToRefs(useMessages())
</script>