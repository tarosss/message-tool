<template>
    <q-dialog v-model="showChannelDialog">
        <q-card class="body-channel-dialog">
            <q-toolbar>
                <q-toolbar-title class="font-16">
                    # {{ targetChannel.channel_name }}
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn
                    icon="close"
                    flat
                    @click="showChannelDialog = false">
                </q-btn>
            </q-toolbar>
            <q-tabs
                v-model="tab"
                align="justify"
                narrow-indicator
                class="q-mb-lg">
                <q-tab class="text-purple" name="channel" label="チャンネル情報" />
                <q-tab class="text-orange" name="users" label="メンバー" />
            </q-tabs>
            <q-tab-panels v-model="tab"  class="text-dark text-center">
                <q-tab-panel name="channel">
                    <q-card 
                        class="cursor-pointer text-left q-mb-lg"
                        flat>
                        <q-card-section class="row justify-between"> 
                            <div class="row">
                                <span
                                    class="font-bold col-12">
                                    チャンネル名
                                </span>
                                <span class="col-12">
                                    {{ targetChannel.channel_name }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>
                        </q-card-section>
                    </q-card>
                    <q-card 
                        class="cursor-pointer q-mb-sm"
                        flat>
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    トピック
                                </span>
                                <span class="col-12">
                                    {{ targetChannel.topic ?? 'トピックを追加する' }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>
                        </q-card-section>
                        <q-separator />
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    説明
                                </span>
                                <span class="col-12">
                                    {{ targetChannel.description ?? '説明を追加する' }}
                                </span>
                            </div>
                            <q-btn
                                label="編集"
                                flat
                                dense>
                            </q-btn>
                        </q-card-section>
                        <q-separator />
                        <q-card-section 
                            class="row justify-between text-left">
                            <div class="row">
                                <span class="col-12">
                                    作成者
                                </span>
                                <span class="col-12">
                                    {{ targetChannel.create_user }}さんが{{ targetChannel.created_at }}に作成
                                </span>
                            </div>
                        </q-card-section>
                    </q-card>
                    <q-card flat>
                        <q-card-section class="text-left">
                            <span>
                                ファイル
                            </span>
                        </q-card-section>
                    </q-card>
                </q-tab-panel>
                <q-tab-panel name="users">
                    <q-input outlined v-model="searchName" dense>
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                    <q-list class="cursor-pointer">
                        <q-item @click="addUser">
                            <q-item-section avatar>
                                <q-icon name="person_add" />
                            </q-item-section>
                            <q-item-section @click="addUserDialog = true">メンバーを追加する</q-item-section>
                        </q-item>
                        <q-item
                            v-for="[userId, user] of targetParticipatingUsers"
                            :key="'channel-dialog-participating' + targetChannel._id + userId"
                            clickable
                            @click="displayUserProfile(userId)">
                            <q-item-section avatar>
                                <Avatar
                                    :user="user">
                                </Avatar>
                            </q-item-section>
                            <q-item-section>
                                <span>
                                    {{ user.display_name + loggingUser._id === userId ? ' (自分)' : ''}} 
                                </span>
                                <span>
                                    {{ user.user_name }}
                                </span>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-dialog>
    <q-dialog
        v-model="addUserDialog">
        <q-card>
            <q-card-section>
                <q-toolbar>
                    <div class="row">
                        <span class="col-12">
                            メンバーを追加する
                        </span>
                        <span>
                            # {{ targetChannel.channel_name }}
                        </span>
                    </div>
                    <q-btn
                        icon="close"
                        flat
                        @click="addUserDialog = false">
                    </q-btn>
                </q-toolbar>
                <q-input outlined v-model="addUserDialogSearchName" dense>
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <q-list>
                    <q-item
                        v-for="[userId, user] of targetNotParticipatingUsers"
                        :key="'channel-dialog-not-participating-' + userId"
                        class="cursor-pointer"
                        clickable
                        @click="addUser(user)">
                        <q-item-section >
                            <Avatar
                                :user="user">
                            </Avatar>
                        </q-item-section>
                        <q-item-section>
                            <span>
                                {{ user.display_name }} 
                            </span>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import Avatar from './Avatar.vue'
import { useLogging } from '../store/logging'
import { useShowing } from '../store/showing'
import { useUsers } from '../store/users'
import { useChannelDialog } from '../composables/useChannelDialog'

const { loggingUser } = useLogging()
const { showChannelDialog, displayUserProfile } = useShowing()
const { serachUsers } = useUsers()
const { 
    targetChannel, 
    tab, 
    searchName, 
    addUserDialogSearchName,
    participatingUsers, 
    targetParticipatingUsers, 
    targetNotParticipatingUsers, 
    addUserDialog, 
    addUser,
} = useChannelDialog()
</script>
