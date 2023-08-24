<template>
<div 
    v-if="file"    
    class="file" onmouseenter="">
    <p class="file-icon">   
        
    </p>
    <div>
        <p>{{ file.original_file_name }}</p>
        <p>{{ file.mime_type }}</p>
    </div>
</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useFiles } from '../store/files'
const props = defineProps<{
    _id: string,
}>()

const { files } = useFiles()
const file = computed(() => files.value.get(props._id) as MessageFile)
</script>

