<template>
    <div class="left-nav-title-row left-nav-row pointer">
        <p>
            Δ
        </p>
        <p class="font-18">
            {{ props.title }}
        </p>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    title: string
}>()

</script>