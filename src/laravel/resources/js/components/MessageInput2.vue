<template>
    <div class="relative-position" >
        <q-editor
            :id="editorId"
            v-model="dummyMessage"
            :toolbar="toolBar"
            :definitions="definitions"
            :placeholder="props.channel.channel_name + 'へのメッセージ'"
            dark
            @update:model-value="s => setMessage(s, true)"
            ref="dropZone">
        </q-editor>
        <div
            class="message-input-files row"
            ref="displayFilesZone">
            <File
                v-for="fileData of draft.files"
                :key="props.channel._id + props.message?._id + fileData.original_file_name"
                :file-data="fileData">
                {{ fileData.original_file_name }}
            </File>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import File from './File.vue'
import { useMessage } from '../composables/useMessage'
import { getFetch } from '../common/fetches'
import  { messageStoreUrl } from '../consts/fetches'
import { inject } from 'vue';

const props = defineProps<{
    channel: Channel,
    message?: Message,
}>()

const { draft, dummyMessage, setMessage, createDeleteDraftFileFetch, dropZone, editorId, displayFilesZone, definitions, toolBar } = useMessage({ channelId: props.channel._id, messageId: props.message?._id })

const logingUserId = inject('loging-user-id', '')
const token = inject('token', '')
const storage = inject('storage', 1)

const a = (newString: string) => {
    console.log(newString)
}
</script>