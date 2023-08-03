<template>
    <img :src="publicReactionsStorage + reaction.icon_path">
</template>
<script lang="ts" setup>
import { mdiSendVariant } from '@mdi/js';
import { useReactions } from '../store/reactions'
import { storeToRefs } from 'pinia';
import { publicReactionsStorage } from '../consts/paths'

const props = defineProps<{
    reactionId: string
}>()

const reaction = useReactions().getReaction(props.reactionId)
// console.log(reaction.reaction_name)
</script>