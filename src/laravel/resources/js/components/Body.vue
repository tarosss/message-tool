<template>
    <div class="body">
        <LeftNav></LeftNav>
        <Show :loging-user-id="props.logingUserId"></Show>
    </div>
</template>
<script setup lang="ts">
import LeftNav from './LeftNav.vue';
import Show from './Show.vue'

const props = defineProps<{
 logingUserId: string,
}>()
</script>
