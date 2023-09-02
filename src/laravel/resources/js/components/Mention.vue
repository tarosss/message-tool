<template>
    <q-card max-height="130px" class="text-black">
        <q-toolbar class="text-black rounded-borders">
            <q-input v-model="searchName" class="q-ml-md " color="black" borderless>
                <template v-slot:append>
                    <q-icon v-if="searchName !== ''" name="close" @click="searchName = ''"></q-icon>
                    <q-icon v-else name="search" @click="searchName = ''"></q-icon>
                </template>
            </q-input>
            <q-btn
                icon="close"
                flat
                @click="emits('clickClose', false)">
            </q-btn>
        </q-toolbar>
        <q-list bordered style="min-width: 100px">
            <q-item 
                v-for="[userId, user] of serachUsers(searchName)"
                :key="props.channel._id + props.message?._id + 'mention' + userId"
                class="cursor-pointer"
                :class="{'bg-red': props.draft.mentions.includes(userId)}"
                @click="emits('updateMentions', userId)"
                dense
                clickable>
                <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="bluetooth"></q-avatar>
                </q-item-section>
                <q-item-section class="text-black">
                    {{ user.display_name }}
                </q-item-section>
            </q-item>
        </q-list>
    </q-card>
</template>
<script lang="ts" setup>
import { ref, inject, watchEffect, computed } from 'vue'
import { useUsers } from '../store/users'
import { getDraftKey } from '../common/draftUtils'
import { watch } from 'fs';

const userId = inject('logging-user-id', '')
const { serachUsers } = useUsers()
const props = defineProps<{
    channel: Channel,
    message?: Message,
    draft: Draft,
}>()

const emits = defineEmits<{
    (e: 'updateMentions', userId: string): void,
    (e: 'clickClose', value: boolean): void,
}>()

const searchName = ref('')
</script>
