<template>
    <div class="reaction-bar">
        <Reaction
            v-for="reactionId in bars" :key="'barreaction-' + props.message._id + reactionId"
            :reaction-id="reactionId"
            @click="addReaction({ userId: logingUserId, token, reactionId, messageId: props.message._id})">
        </Reaction>
        <div v-if="!props.isThread" @click="setThread({ newChannelId: showingChannelId, newThreadMessageId: props.message._id})"
            class="pointer">
            ス
        </div>
    </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import Reaction from './Reaction.vue'
import { useMessages } from '../store/messages'
import { useReactions } from '../store/reactions'
import { useShowing } from '../store/showing'
import { deepCopy } from '../common/objectUtils'
import { getFetch } from '../common/fetches'
import { messageUpdateUrl } from '../consts/fetches'
import { addReaction } from '../common/updateMessages'
const { bars } = useReactions()

const props = withDefaults(defineProps<{
    message: Message,
    isThread?: boolean,
}>(), {
    isThread: false
})

const logingUserId = inject('loging-user-id', '')
const token = inject('token', '')
const { showing, showingChannelId, setThread } = useShowing()

</script>