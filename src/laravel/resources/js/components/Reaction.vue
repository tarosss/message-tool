<template>
    <img 
        :src="publicReactionsStorage + reaction.icon_path" 
        class="reaction-image pointer"
        @click="clicked">
</template>
<script lang="ts" setup>
import { mdiSendVariant } from '@mdi/js';
import { useMessages } from '../store/messages'
import { useReactions } from '../store/reactions'
import { useShowing } from '../store/showing'
import { publicReactionsStorage } from '../consts/paths'
import { inject } from 'vue';

const props = defineProps<{
    reactionId: string,
    messageId: string,
}>()

const logingUserId = inject('loging-user-id', '')

const reaction = useReactions().getReaction(props.reactionId)

const clicked = () => {
    const { showing } = useShowing()
    const { addReaction } = useMessages('message-' + showing.value)
    
    addReaction({ userId: logingUserId, messageId: props.messageId, reactionId: props.reactionId })
}
</script>