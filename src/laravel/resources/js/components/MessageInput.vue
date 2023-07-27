<template>
    <div class="message-input" ref="dropZone">
        <textarea
            v-model="message"
            ref="textZone"
            rows="1"
            :style="{
                height:  textZoneHeight,
            }"
            >
        </textarea>
        <!-- <div v-for="file in files" :key="file.name">
            {{ file.name }}
        </div> -->
        <input type="file" class="message-input-file">
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useMessage } from '../composables/useMessage'
import { useDropZone } from '../composables/useDropZone';
const { message, files, dropZone, textZone, textZoneHeight, isOverDropZone} = useMessage()

</script>