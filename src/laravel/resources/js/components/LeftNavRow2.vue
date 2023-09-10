<template>
    <q-item 
        dense
        class="left-nav-row cursor-pointer row items-center"
        :class="{'left-nav-row-showing': isShowing}"
        @click="showChannel">
        <div>
            <q-icon 
                class="q-mr-sm"
                name="circle"></q-icon>
            <span class="">
                {{ displayChannelName }}
            </span>
        </div>
    </q-item>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'
import { useChannelRow } from '../composables/useChannelRow'

const props = defineProps<{
    channel: Channel,
}>()

const { isShowing, displayChannelName, showChannel } = useChannelRow(props.channel)

// /** ダイレクトメッセージと自分用メモのチャンネル名の表記 */
// const getDisplayChannelName = computed(() => {
//     if (props.channel.channel_type === CHANNEL_TYPE_NORMAL) {
//         return props.channel.channel_name
//     }

//     const { users } = useUsers()
//     const tempUserId = getAnotherUserId(props.channel)
//     let a = ''
//     if (props.channel.channel_type === CHANNEL_TYPE_MEMO) {
//         a = ' (自分用)'
//     }
//     return users.value.get(tempUserId)?.display_name + a
// })
</script>
