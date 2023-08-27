<template>
  <div class="message relative-position" ref="element">
    <p class="message-icon">

    </p>
    <div class="message-content">
      <div class="message-content-detail">
        <p class="margin-right-10">
          {{ user.display_name }}
        </p>
        <p class="font-10">
          {{ format({date: message.created_at, formatString: 'HH:mm' }) }}
        </p>
        
      </div>
      <p class="message-content-text font-16">
        {{ message.message }}
      </p>
      <UserReactionBar
        v-if="Object.keys(message.reactions).length"
        :message="message">
      </UserReactionBar>
    </div>
    <ReactionBar 
      v-if="isHoverd"
      class="absolute-top-right"
      :message="props.message"
      :is-thread="props.isThread">
    </ReactionBar>
  </div>
</template>
<script lang="ts" setup>
import { Ref, computed, onMounted, watch } from 'vue'
import ReactionBar from './ReactionBar.vue'
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
