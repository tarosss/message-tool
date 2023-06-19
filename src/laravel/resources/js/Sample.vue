<template>
    <p>
        <input type="text" v-model="link">
        <button @click="clicked">絶対</button>
    </p>
    <B></B>
</template>
<script lang="ts" setup>
import { ref, computed, unref, watchEffect, onUpdated, watch, onMounted, defineAsyncComponent, DirectiveBinding, useAttrs } from 'vue'
import B from './samples/B.vue'
import A from './samples/A.vue'
import { useSampleStore } from './store/sampleStore'
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
const link = ref('')

const router = useRouter()

const clicked = () => {
    router.push(link.value)
}
</script>
