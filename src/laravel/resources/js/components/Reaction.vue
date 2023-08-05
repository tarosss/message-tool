<template>
    <img :src="publicReactionsStorage + reaction.icon_path" class="reaction-image pointer">
</template>
<script lang="ts" setup>
import { mdiSendVariant } from '@mdi/js';
import { useReactions } from '../store/reactions'
import { storeToRefs } from 'pinia';
import { publicReactionsStorage } from '../consts/paths'
import { test } from '../store/test'
const props = defineProps<{
    reactionId: string
}>()

const reaction = useReactions().getReaction(props.reactionId)

// console.log(reaction.reaction_name)
</script>