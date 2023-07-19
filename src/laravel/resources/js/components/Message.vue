<template>
  <div class="body-channel-message">
    <p class="body-channel-message-icon">

    </p>
    <div class="body-channel-message-content">
      <div class="body-channel-message-content-detail">
        <p class="margin-right-10">
          {{ user.display_name }}
        </p>
        <p class="font-10">
          {{ format(new Date(message.created_at), 'HH:mm') }}
        </p>
        
      </div>
      <p class="body-channel-message-content-text">
        {{ message.message }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { format } from 'date-fns'
import { useUsers } from '../store/users';
// import socket from './socket';
const props = defineProps<{
  message: Message,
}>()

const user = computed(() => useUsers().getUser(props.message.user_id) as User)
</script>
