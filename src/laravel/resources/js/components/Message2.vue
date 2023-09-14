<template>
    <q-card 
        style="background: inherit"
        ref="element">
        <div v-if="!editing">
            <div class="row text-white relative-position" >
                <Avatar 
                    class="text-black q-mr-sm" 
                    :badge="false" 
                    :size="35">
                </Avatar>
                <div class="column">
                    <div class="col row items-end">
                        <span class="margin-right-10">
                            {{ user.display_name }}
                        </span>
                        <span class="font-10">
                            {{ format({date: message.created_at, formatString: 'HH:mm' }) }}
                        </span>
                    </div>
                    <div class="col-8">
                        {{ props.message.message }}
                    </div>
                </div>
            </div>
            <div v-if="props.message.files.length">
                <!-- <File
                    v-for="fileId of props.message.files"
                    :key="'message-row' + props.message._id + fileId"
                    :file-data="(files.get(fileId) as MessageFile)">
                </File> -->
            </div>
            <UserReactionBar
                v-if="Object.keys(props.message.reactions).length"
                :message="message">
            </UserReactionBar>
            <div class="reaction-bar-wrapper">
                <ReactionBar 
                    v-if="isHoverd"
                    :message="props.message"
                    :is-thread="props.isThread"
                    @editMessage="editing = true">
                </ReactionBar>
            </div>
        </div>
        <div v-else>
            <EditMessageInput
                :message="props.message"
                @endEdit="editing = false">
            </EditMessageInput>
        </div>
    </q-card>
</template>
<script lang="ts" setup>
import File from './File.vue'
import { Ref, ref, computed, onMounted, watch } from 'vue'
import ReactionBar from './ReactionBar.vue'
import Avatar from './Avatar.vue'
import UserReactionBar from './UserReactionBar.vue'
import Reaction from './ReactionBar.vue'
import EditMessageInput from './EditMessageInput.vue'
import { useFiles } from '../store/files'
import { format } from '../common/dateFormats'
import { useUsers } from '../store/users';
import { useElementHover } from '../composables/useElementHover'

const props = withDefaults(defineProps<{
    message: Message,
    isThread?: boolean,
}>(), {
    isThread: false
})

const { files } = useFiles()
const { element, isHoverd } = useElementHover()
const user = computed(() => useUsers().getUser(props.message.user_id) as User)

const editing = ref(false)
const startEdit = () => {
    editing.value = true
}

</script>
