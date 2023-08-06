<template>
    <img 
        :src="publicReactionsStorage + reaction.icon_path" 
        class="reaction-image pointer">    
    
</template>
<script lang="ts" setup>
import { useReactions } from '../store/reactions'
import { publicReactionsStorage } from '../consts/paths'
import { computed } from 'vue';
const props = defineProps<{
    reactionId: string,
}>()

const reaction = useReactions().getReaction(props.reactionId)

// const showUsers = computed(() => 1)
// const clicked = () => {
//     const { showing } = useShowing()
    
//     const message = deepCopy(useMessages('message-' + showing.value).messages.value.get(props.messageId) as Message)
//     message.reactions.push({
//         userId: logingUserId,
//         reactionId: props.reactionId
//     })

//     getFetch({token: token})(messageUpdateUrl).post({
//         data: [message]
//     })
// }
</script>