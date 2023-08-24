<template>
    <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2">

        <q-tab 
            v-for="tab of props.tabs" 
            :key="props.message._id + tab.name"
            :name="tab.name" 
            :icon="tab.icon" >
        </q-tab>
    </q-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{
    message: Message,
    tabs: {
        name: string,
        icon: string,
    }[]
}>()
const tab = ref('')

</script>
