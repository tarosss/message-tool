<template>
    <img 
        :src="publicReactionsStorage + reaction.icon_path" 
        class="reaction-image pointer"
        @click="clicked">
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { mdiSendVariant } from '@mdi/js';
import { useMessages } from '../store/messages'
import { useReactions } from '../store/reactions'
import { useShowing } from '../store/showing'
import { getFetch } from '../common/fetches';
import { publicReactionsStorage } from '../consts/paths'
import { messagetUpdateUrl } from '../consts/fetches'
const props = defineProps<{
    reactionId: string,
    messageId: string,
}>()

const logingUserId = inject('loging-user-id', '')
const token = inject('token', '')
const reaction = useReactions().getReaction(props.reactionId)

const clicked = () => {
    const { showing } = useShowing()
    const { addReaction } = useMessages('message-' + showing.value)
    
    const message = useMessages('message-' + showing.value).messages.value.get(props.messageId)
    
    message?.reactions.push({
        userId: logingUserId,
        reactionId: props.reactionId
    })

    getFetch({token: token})(messagetUpdateUrl).post({
        data: [message]
    })
    // addReaction({ userId: logingUserId, messageId: props.messageId, reactionId: props.reactionId })
}
</script>