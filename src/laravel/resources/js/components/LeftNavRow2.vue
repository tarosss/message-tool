<template>
    <q-item 
        dense
        class="left-nav-row cursor-pointer row items-center"
        :class="{'left-nav-row-showing': showing == props.channel._id}"
        @click="clicked">
        <div>
            <q-icon 
                class="q-mr-sm"
                name="circle"></q-icon>
            <span class="">
                {{ getDisplayChannelName }}
            </span>

        </div>
    </q-item>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useShowing } from '../store/showing'
import { useChannels } from '../store/channels'
import { useUsers } from '../store/users'
import { CHANNEL_TYPE_NORMAL, CHANNEL_TYPE_DIRECT_MESSAGE, CHANNEL_TYPE_MEMO} from '../consts/channel'
import UserList from './UserList.vue';
const props = defineProps<{
    channel: Channel,
}>()

const { showing, setShowing } = useShowing()
const { getAnotherUserId } = useChannels()
const clicked = () => {
    setShowing(props.channel._id)
}

/** ダイレクトメッセージと自分用メモのチャンネル名の表記 */
const getDisplayChannelName = computed(() => {
    if (props.channel.channel_type === CHANNEL_TYPE_NORMAL) {
        return props.channel.channel_name
    }

    const { users } = useUsers()
    const tempUserId = getAnotherUserId(props.channel)
    let a = ''
    if (props.channel.channel_type === CHANNEL_TYPE_MEMO) {
        a = ' (自分用)'
    }
    return users.value.get(tempUserId)?.display_name + a
})
</script>
