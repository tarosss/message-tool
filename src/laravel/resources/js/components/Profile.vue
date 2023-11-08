<template>
    <q-card
        v-if="user"
        style="background: inherit"

        class="profile">
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
            <div class="row justify-between">
                <span class="text-bold">連絡先情報</span>
                <q-btn
                    label="編集"
                    flat
                    @click="">
                </q-btn>
            </div>
            <div class="row">
                <q-icon
                    class="q-mr-sm"
                    size="xs"
                    name="mail">
                    <q-tooltip>
                        Some text as content of Tooltip
                    </q-tooltip>
                </q-icon>
                <span class="profile-email">
                    {{ user.email }}
                </span>
                <q-menu>
                    <q-list class="q-py-lg">
                        <q-item class="cursor-pointer" >
                            <span @click="startDm(user._id)">DMを開始する</span>
                        </q-item>
                        <q-item class="cursor-pointer">
                            <span @click="copyEmail(user.email)">メールアドレスをコピーする</span>
                        </q-item>
                    </q-list>
                </q-menu>
            </div>
        </q-card-section>
    </q-card>
</template>
<script lang="ts" setup>
import Avatar from './Avatar.vue'
import { useLogging } from '../store/logging'
import { useProfile } from '../composables/useProfile'

const { user, startDm, copyEmail } = useProfile()
console.log(user.value)
</script>
