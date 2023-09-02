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
            <div
                class="relative-position"
                style="min-width: 300px;"
                v-for="fileData of draft.files"
                :key="props.channel._id + props.message?._id + fileData.original_file_name + fileData.file_name">
                <File :file-data="fileData"></File>
                <q-icon
                    name="close"
                    class="text-black cursor-pointer absolute file-delete-icon"
                    size="xs"
                    @click="createDeleteDraftFileFetch(fileData)">
                </q-icon>
            </div>
        </div>
        <div
            class="absolute mentions-show q-pa-sm row q-gutter-x-lg"
            ref="mentionZone">
            <div 
                v-for="userId of draft.mentions" 
                :key="'selected' + props.channel._id + props.message?._id + userId"
                class="reletive-position">
                <q-card 
                    class="bg-light-blue-8 rounded-borders q-pl-xs q-pr-lg">
                    @{{ users.get(userId)?.display_name }}
                    <q-badge 
                        color="white" 
                        text-color="black"
                        class="cursor-pointer"
                        floating
                        @click="updateMentions(userId)">
                        ×
                    </q-badge>
                </q-card>
                
            </div>
        </div>
        <Mention
            v-if="showMentions"
            class="absolute mentions-selector"
            :channel="props.channel"
            :message="props.message"
            :draft="draft"
            @updateMentions="(v: string) => updateMentions(v)"
            @clickClose="(v: boolean) => setShowMentions(v)">
        </Mention>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import File from './File.vue'
import Mention from './Mention.vue'
import { useUsers } from '../store/users'
import { useMessage } from '../composables/useMessage'
import { getFetch } from '../common/fetches'
import  { messageStoreUrl } from '../consts/fetches'
import { inject } from 'vue';

const { users } = useUsers()
const props = defineProps<{
    channel: Channel,
    message?: Message,
}>()

const { 
    draft, 
    dummyMessage, 
    setMessage, 
    setMentions,
    showMentions,
    updateMentions,
    setShowMentions,
    createDeleteDraftFileFetch, 
    dropZone, 
    editorId, 
    displayFilesZone, 
    mentionZone,
    definitions, 
    toolBar,
} = useMessage({ channelId: props.channel._id, messageId: props.message?._id })

const logingUserId = inject('logging-user-id', '')
const token = inject('token', '')
const storage = inject('storage', 1)

</script>