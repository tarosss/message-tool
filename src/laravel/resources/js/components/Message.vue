<template>
  <div class="message position-relative" ref="element">
    <p class="message-icon">

    </p>
    <div class="message-content">
      <div class="message-content-detail">
        <p class="margin-right-10">
          {{ user.display_name }}
        </p>
        <p class="font-10">
          {{ format(new Date(message.created_at), 'HH:mm') }}
        </p>
        
      </div>
      <p class="message-content-text">
        {{ message.message }}
      </p>
    </div>
    <ReactionBar 
      v-if="isHoverd"
      class="position-absolute top-0 end-0">
    </ReactionBar>
  </div>
</template>
<script lang="ts" setup>
import { Ref } from 'vue';
import { computed, onMounted, watch } from 'vue'
import ReactionBar from './ReactionBar.vue'
import { format } from 'date-fns'
import { useUsers } from '../store/users';
import { test } from '../store/test'
import { useElementHover } from '../composables/useElementHover'

// import socket from './socket';
const props = defineProps<{
  message: Message,
}>()

const { element, isHoverd } = useElementHover()
const user = computed(() => useUsers().getUser(props.message.user_id) as User)

</script>
