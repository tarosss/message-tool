<template>
    <div>
        
        <Channel 
            v-for="channel in refChannels.channels.value"
            :channel-id="">
            
        </Channel>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useChannels } from '../store/channels';
import Channel from './Channel.vue';

const refChannels = storeToRefs(useChannels())
</script>