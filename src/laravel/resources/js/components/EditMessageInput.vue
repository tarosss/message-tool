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
import { ref, watchEffect } from 'vue'
import { useEditMessage } from '../composables/useEditMessage'

const props = defineProps<{
    message: Message,
}>()

const emits = defineEmits<{
    (e: 'endEdit'): void,
}>()


const { editedMessage, editedMentions, toolBar, definitions, endEdit } = useEditMessage(props.message)

watchEffect(() => {
    if (!endEdit.value) {
        return
    }

    emits('endEdit')
})
</script>