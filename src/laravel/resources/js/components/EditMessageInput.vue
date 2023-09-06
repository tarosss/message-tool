<template>
    <q-editor
        v-model="editedMessage"
        :toolbar="toolBar"
        :definitions="definitions"
        dark
        ref="dropZone">
    </q-editor>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEditMessage } from '../composables/useEditMessage'

const props = defineProps<{
    message: Message,
}>()

const { editedMessage, editedMentions, toolBar, definitions } = useEditMessage(props.message)
</script>