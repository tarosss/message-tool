<template>
    <div v-if="props.user">
        <q-avatar
            v-if="props.user.icon === undefined"
            class="cursor-pointer"
            :icon="userIcon" 
            :style="{
                color:props.user.default_icon_color,
                'background-color': props.user.default_icon_background_color,
            }"
            :font-size="props.size - 10 + 'px'"
            :size="props.size+'px'"
            :rounded="props.rounded"
            @click="emits('clicked')">
            <q-badge 
                v-if="props.badge"
                class="avatar-badge" 
                color="green" 
                rounded 
                floating 
                style="margin-top: 20px;">
            </q-badge>
        </q-avatar>
        <q-avatar
            v-else
            :font-size="props.size - 10 + 'px'"
            :size="props.size+'px'"
            :rounded="props.rounded">
            <img :src="props.user.icon">
        </q-avatar>
    </div>
</template>
<script lang="ts" setup>
import { fasUser as userIcon } from '@quasar/extras/fontawesome-v6'
import { useAvatar } from '../composables/useAvatar'

const props = withDefaults(defineProps<{
    user?: User,
    badge?: boolean,
    size?: number,
    rounded: boolean,
}>(), {
    badge: false,
    size: 32,
    rounded: true,
})

const emits = defineEmits<{
    (e: 'clicked'): void,
}>()

</script>
