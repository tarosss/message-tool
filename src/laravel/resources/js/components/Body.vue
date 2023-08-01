<template>
    <div class="body" :style="style" @mouseup="mouseUp1">
        <LeftNav ref="leftNav"></LeftNav>
        <div class="resizer" ref="resizer1" @mousedown="mouseDown1">

        </div>
        <Show ref="show"></Show>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import LeftNav from './LeftNav.vue';
import Show from './Show.vue'
import Resizer from './Resizer.vue'
import { useResizer } from '../composables/useResizer'
const gridTemplateColumns = ref([])
// const style = computed(() => {
//     const style = {
//         'grid-template-columns': '300px 5px 1fr',
//     }
//     return style
// })



const { style, leftNav, show, rightNav, resizer1, resizer2, mouseDown1, mouseUp1} = useResizer()
</script>
