<template>
    <q-card
        ref="element"
        class="row items-center text-black relative-position"
        flat
        bordered>
        <q-icon 
            class="text-black"
            name="draft">
        </q-icon>
        <p>
            {{ props.fileData.original_file_name }}
        </p>
        <q-badge
            class="cursor-pointer"
            color="white" 
            text-color="black"
            floating
            rounded
            size="xs"
            @click="createDeleteDraftFileFetch(fileData)">
            ×
        </q-badge>
        <q-card
            v-if="isHoverd"
            class="absolute-right">
            <q-card-actions>
                <q-btn
                    icon="download"
                    flat>
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-card>
</template>
<script lang="ts" setup>
import { useElementHover } from '../composables/useElementHover'
const props = defineProps<{
    fileData: DraftFile,
}>()
const { isHoverd, element } = useElementHover()

</script>

