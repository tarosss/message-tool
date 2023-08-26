<template>
    <Reaction
        v-for="(userIds, reactionId) in message.reactions" :key="'user-reaction-' + reactionId + message._id"
        :reaction-id="reactionId"
        :user-ids="userIds">
    </Reaction>
</template>
<script lang="ts" setup>
import Reaction from './Reaction.vue'
import { useMessages } from '../store/messages'
const props = defineProps<{
    message: Message,
}>()

</script>