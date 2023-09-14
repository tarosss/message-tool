<template>
    <q-card
        class="row items-center text-black relative-position q-py-lg"
        ref="element"
        flat
        bordered>
        <q-icon
            class="q-mr-sm"
            size="lg"
            name="description">
            <q-tooltip>
                Some text as content of Tooltip
            </q-tooltip>
        </q-icon>
        <span>
            {{ props.fileData.original_file_name }}
        </span>
        <q-card
            v-if="isHoverd"
            class="absolute file-actions">
            <q-card-actions>
                <q-btn
                    icon="download"
                    flat>
                    <q-tooltip>
                        ダウンロード
                    </q-tooltip>
                </q-btn>
                <q-btn
                    icon="open_in_new"
                    flat>
                    <q-tooltip>
                        新しいタブで開く
                    </q-tooltip>
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-card>
</template>
<script lang="ts" setup>
import { useElementHover } from '../composables/useElementHover'
const props = defineProps<{
    fileData: DraftFile | MessageFile,
}>()
const { isHoverd, element } = useElementHover()

</script>

