<template>
    <div class="reaction-bar">
        <Reaction
            v-for="bar in bars" :key="'barreaction-' + bar"
            :reaction-id="bar"
            :message-id="props.messageId">
        </Reaction>
    </div>
</template>
<script lang="ts" setup>
import Reaction from './Reaction.vue'
import { useReactions } from '../store/reactions';
const { bars } = useReactions()

const props = defineProps<{
    messageId: string,
}>()

</script>