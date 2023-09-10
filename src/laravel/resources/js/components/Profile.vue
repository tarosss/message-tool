<template>
    <q-card>
        <q-toolbar>
            <q-toolbar-title>
                プロフィール
            </q-toolbar-title>
            <q-btn con="close" flat round dense></q-btn>
        </q-toolbar>
        <q-card-section class="row justify-center items-center">
            <Avatar 
                :user="user"
                style="width">
            </Avatar>
        </q-card-section>
        <q-card-section class="row justify-between">
            <span>
                {{ user.display_name }}
            </span>
            <q-btn
                label="編集"
                flat
                @click="">
            </q-btn>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
            <div class="row">
                <span class="text-bold">連絡先情報</span>
                <q-btn
                    label="編集"
                    flat
                    @click="">
                </q-btn>
            </div>
        </q-card-section>
    </q-card>
</template>
<script lang="ts" setup>
import Avatar from './Avatar.vue'
import { useLogging } from '../store/logging'
import { useProfile } from '../composables/useProfile'

const { user } = useProfile()
</script>
