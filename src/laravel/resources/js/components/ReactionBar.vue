<template>
    <q-card 
        class="bg-black">
        <q-card-actions>
            <q-btn 
                v-for="reaction of reactions" 
                :key="props.message._id + reaction.name"
                :name="reaction.name" 
                :icon="reaction.icon"
                class="text-white"
                :size="'xs'"
                flat>
                <q-tooltip>
                    {{ reaction.tip }}
                </q-tooltip>
            </q-btn>
            <q-btn
                v-if="!props.isThread"
                :size="'xs'"
                :icon="thread.icon"
                @click="setThread({ newChannelId: showingChannelId, newThreadMessageId: props.message._id})">
                <q-tooltip>
                    {{ thread.tip }}
                </q-tooltip>
            </q-btn>
            <q-btn
                icon="edit"
                size="xs"
                @click="emits('editMessage')">
            </q-btn>
        </q-card-actions>
    </q-card>
    <!-- <Reaction
        v-for="reactionId in bars" :key="'barreaction-' + props.message._id + reactionId"
        :reaction-id="reactionId"
        @click="addReaction({ userId: logingUserId, token, reactionId, messageId: props.message._id})">
    </Reaction>
    <div v-if="!props.isThread" @click="setThread({ newChannelId: showingChannelId, newThreadMessageId: props.message._id})"
        class="pointer">
        <Icon icon-name="comment"></Icon>
    </div> -->
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import Reaction from './Reaction.vue'
import Icon from './Icon.vue'
import { useReactions } from '../store/reactions'
import { useShowing } from '../store/showing'
import { useReactionBar } from '../composables/useReactionBar'
import { addReaction } from '../common/updateMessages'
const { bars } = useReactions()

const props = withDefaults(defineProps<{
    message: Message,
    isThread?: boolean,
}>(), {
    isThread: false
})

const logingUserId = inject('logging-user-id', '')
const token = inject('token', '')
const { showing, showingChannelId, setThread } = useShowing()
const { reactions, thread } = useReactionBar()
const emits = defineEmits<{
    (e: 'editMessage'): void,
}>()
</script>