<template>
    <q-avatar class="bg-white cursor-pointer" icon="person" :size="props.size" font-size="27px" rounded>
        <q-badge 
            v-if="props.badge"
            class="avatar-badge" 
            color="green" 
            rounded 
            floating 
            style="margin-top: 20px;">
        </q-badge>
    </q-avatar>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    badge?: boolean,
    size?: QSizes,
}>(), {
    badge: true,
    size: 'sm',
})
</script>
