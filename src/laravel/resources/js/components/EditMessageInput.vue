<template>
    <q-editor
        v-model="dummyMessage"
        :toolbar="toolBar"
        :definitions="definitions"
        :placeholder="props.channel.channel_name + 'へのメッセージ'"
        dark
        @update:model-value="s => setMessage(s, true)"
        ref="dropZone">
    </q-editor>
</template>

<script lang="ts" setup>
const props = defineProps<{
    message: Message,
}>()


</script>