<template>
    <q-card 
        class="row text-white relative-position" 
        style="background: inherit"
        ref="element">
        <Avatar 
            class="text-black q-mr-sm" 
            :badge="false" :size="'md'">
        </Avatar>
        <div class="column">
            <div class="col row items-end">
                <span class="margin-right-10">
                    {{ user.display_name }}
                </span>
                <span class="font-10">
                    {{ format({date: message.created_at, formatString: 'HH:mm' }) }}
                </span>
            </div>
            <div class="col-8">
                {{ props.message.message }}
            </div>
        </div>
        <UserReactionBar
            v-if="Object.keys(props.message.reactions).length"
            :message="message">
        </UserReactionBar>
        <div class="reaction-bar-wrapper">
            <ReactionBar 
                v-if="isHoverd"
                :message="props.message"
                :is-thread="props.isThread">
            </ReactionBar>
        </div>
    </q-card>
</template>
<script lang="ts" setup>
import { Ref, computed, onMounted, watch } from 'vue'
import ReactionBar from './ReactionBar.vue'
import Avatar from './Avatar.vue'
import UserReactionBar from './UserReactionBar.vue'
import Reaction from './ReactionBar.vue'
import { format } from '../common/dateFormats'
import { useUsers } from '../store/users';
import { useElementHover } from '../composables/useElementHover'

const props = withDefaults(defineProps<{
    message: Message,
    isThread?: boolean,
}>(), {
    isThread: false
})

const { element, isHoverd } = useElementHover()
const user = computed(() => useUsers().getUser(props.message.user_id) as User)

</script>
