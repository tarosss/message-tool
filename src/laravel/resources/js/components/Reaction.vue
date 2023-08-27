<template>
    <q-btn 
        class="bg-black"
        rounded
        dense>
        <q-icon :size="'sm'">
            <img 
                :src="publicReactionsStorage + reaction.icon_path" 
                class="reaction-image pointer">    
        </q-icon>
        <q-badge
            :color="'black'"
            :text-color="'white'"
            rounded>
            {{ props.userIds.length }}
        </q-badge>
    </q-btn>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useReactions } from '../store/reactions'
import { publicReactionsStorage } from '../consts/paths'
const props = defineProps<{
    reactionId: string,
    userIds: string[],
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