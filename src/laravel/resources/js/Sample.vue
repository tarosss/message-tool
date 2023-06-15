<template>
    <input ref="input" class=",cla">
    <B :ref="b"></B>
    <A></A>
</template>
<script lang="ts" setup>
import { ref, computed, unref, watchEffect, onUpdated, watch, onMounted } from 'vue'
import B from './samples/B.vue'
import A from './samples/A.vue'

const b = ref()
const modal = ref<InstanceType<typeof MyClass>>

console.log(modal)



class MyClass {

}
</script>
