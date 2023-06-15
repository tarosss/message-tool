<template>
    <div class="a">
        {{ text }}
        <input type="text" v-model="text">
        <!-- <App2/> -->
        <!-- text2 =  {{ text2 }} !! -->    
    </div>
</template>

<script setup lang="ts">

import { computed, ref } from "vue";

import { useStore } from 'vuex'

import {useMouse} from './mouse'
import { useFetch } from "./samples/useFetch";

const store = useStore()
const text = ref('text')
const text2 = ref(text)
const g = computed(() => store.state.gacha)
const g2 = computed(() => {
    console.log('gs');
    const a = store.state.gacha
    return a + 1
})

const url = ref('cscsc')
const {data, error} = useFetch(text)
// const {x,y} = useMouse()



</script>

