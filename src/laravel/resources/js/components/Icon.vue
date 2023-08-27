<template>
    <q-icon
        :name="props.iconName"
      />
</template>
<script lang="ts" setup>
const props = defineProps<{
    iconName: string,
}>()
</script>