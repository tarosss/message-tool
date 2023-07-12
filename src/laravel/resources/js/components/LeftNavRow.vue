<template>
    <div class="left-nav-row pointer">
        <p>
            ＠
        </p>
        <p class="">
            {{ props.title }}
        </p>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()

</script>
