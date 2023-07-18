<template>
    <div v-if="channel" class="body-channel padding-top-10">
        <div class="body-channel-header">
            <p class="font-20">
               # {{ channel.channel_name }}
            </p>
            <div class="body-channel-header-right">
                <div class="body-channel-header-right-members">
                    <p class="body-channel-header-right-members-icon"></p>
                </div>
            </div>
        </div>
        <p>
            {{ format(new Date(channel.created_at), 'yyyy年MM月dd日') }}、
            
            {{ channelCreateUserDisplayName }} がこのチャンネルを作成しました。チャンネルをどんどん活用していきましょう！ 
        </p>
        <div>
            <div v-for="[messageId, message] of messages.messages" :key="'message' + messageId">
                {{ messageId }}
                {{ message.message }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useUsers } from '../store/users';
import { useChannels } from '../store/channels';
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';
import { format } from 'date-fns'
import { storeToRefs } from 'pinia';

const props = defineProps<{
    logingUserId: string,
    channelId: string,
}>()
const refUsers = storeToRefs(useUsers())
const refShowing = storeToRefs(useShowing())
const channel = computed(() => useChannels().getChannel(refShowing.showing.value))
const messages =  computed(() => useMessages('message-' + refShowing.showing.value))

const channelCreateUserDisplayName = computed(() => {
    console.log(props.logingUserId)
    if (channel.value.create_user === props.logingUserId) {
        return 'あなた'
    }

    return refUsers.users.value.get(props.logingUserId)?.display_name + 'さん'
})

</script>