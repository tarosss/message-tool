<template>
    <div>
        <ShowChannel
            v-if="refShowing.component.value === 'channel'"
            :loging-user-id="props.logingUserId"
            :channelId="refShowing.showing.value"
            >
        </ShowChannel>
        <ShowNothing v-else="refShowing.component.value === ''"></ShowNothing>
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

const props = defineProps<{
 logingUserId: string,
}>()

const refShowing = storeToRefs(useShowing())
const refChannels = storeToRefs(useChannels())

// sample[0] = ShowChannel
</script>
