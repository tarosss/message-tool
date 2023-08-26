<template>
    <div class="body" :style="style" @mouseup="mouseUp">
        <LeftNav ref="leftNav"></LeftNav>
        <div class="resizer" ref="resizer1" @mousedown="mouseDown1"></div>
        <Show ref="show"></Show>
        <div 
            v-if="showThread"
            class="resizer" ref="resizer2" @mousedown="mouseDown2"></div>
        <Thread ref="thread"
            v-if="showThread">
        </Thread>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import LeftNav from './LeftNav2.vue';
import Show from './Show.vue'
import Thread from './Thread.vue'
import Resizer from './Resizer.vue'
import { useShowing } from '../store/showing'
import { useMessages } from '../store/messages'
import { useResizer } from '../composables/useResizer'


const { style, leftNav, show, thread, resizer1, resizer2, mouseDown1, mouseDown2, mouseUp} = useResizer()
const { showing, showingChannelId, showingThreadMessageId, showThread, setShowingThread } = useShowing()
const { messages } = useMessages('message-' + showingChannelId.value)
const localShowThread = computed(() => showThread.value)
</script>
