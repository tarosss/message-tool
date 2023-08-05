<template>
    <div class="reaction-bar">
        <Reaction
            v-for="bar in bars" :key="'barreaction-' + bar"
            :reaction-id="bar">
        </Reaction>
    </div>
</template>
<script lang="ts" setup>
import Reaction from './Reaction.vue'
import { useReactions } from '../store/reactions';
import { storeToRefs } from 'pinia';
const { bars } = storeToRefs(useReactions())
</script>