<template>
    <div 
        class="left-nav-row pointer"
        :class="{'left-nav-row-showing': showing.showing == props._id}"
        @click="clicked">
        <p>
            ＠
        </p>
        <p class="">
            {{ props.title }}
        </p>

    </div>
</template>
<script lang="ts" setup>
import { useShowing } from '../store/showing'

import { useChannels } from '../store/channels';
import { storeToRefs } from 'pinia';
const refChannels = storeToRefs(useChannels())

const props = defineProps<{
    _id: string,
    title: string,
}>()

const showing = useShowing()
const clicked = () => {
    showing.setShowing(props._id)
}



</script>
