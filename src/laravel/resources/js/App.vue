<template>
    <div class="a">
        {{ hello  }}
        {{ g }}
        {{ g2 }}
        sscacsscscs
        <App2 />
    </div>
</template>

<script setup lang="ts">

import { computed, ref } from "vue";
import sample from './sample'
import App2 from './App2.vue'
import { useStore } from 'vuex'

const store = useStore()
const hello = ref('cjsc')
const g = computed(() => store.state.gacha)
const g2 = computed(() => {
    console.log('gs');
    const a = store.state.gacha
    return a + 1
})

const g3 = computed(() => {
    console.log(g2);
    
})
</script>

