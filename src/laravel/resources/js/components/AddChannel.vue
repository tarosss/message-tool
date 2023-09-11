<template>
    <q-dialog v-model="showAddChannelModal">
        <q-card v-if="!showAddUsers">
            <q-card-section class="row">
                <span class="text-h5">
                    チャンネル作成
                </span>.
                <q-space></q-space>
                <q-btn
                    icon="close"
                    flat
                    @click="closeModal">
                </q-btn>
            </q-card-section>
            <q-card-section>
                <p class="text-h6">
                    名前
                </p>
                <q-input 
                    v-model="channelName" 
                    placeholder="# 例:計画"
                    outlined>
                </q-input>
                <p>
                    チャンネルとは、特定のトピックに関する会話が行われる場所です。見つけやすく、わかりやすい名前を使用してください。
                </p>
            </q-card-section>
            <q-card-section class="row">
                <span class="text-black">ステップ 1/2</span>
                <q-space></q-space>
                <q-btn 
                    class="q-py-xm q-px-lg corsor-pointer"
                    :class="{'bg-grey-5': !canUseChannelName, 'bg-light-blue-8': canUseChannelName}"
                    @click="nextStep">
                    追加
                </q-btn>
            </q-card-section>
        </q-card>
        <q-card v-else>
            <q-card-section class="row">
                <div class="row">
                    <span class="col-12 text-h5">
                        メンバーを追加する
                    </span>
                    <span class="col-12">
                        # {{ channelName }}
                    </span>
                </div>
                <q-space></q-space>
                <q-btn
                    icon="close"
                    flat
                    @click="closeModal">
                </q-btn>
            </q-card-section>
            <q-card-section>
                <q-input 
                    v-model="serachName" 
                    placeholder="名前を入力する"
                    outlined>
                </q-input>
                <q-card v-if="serachName !== ''">
                    <q-list>
                        <q-item 
                            v-for="[userId, user] of serachUsers(serachName)"
                            :key="'add-channel-' + userId"
                            class="cursor-pointer"
                            :class="{'bg-red': users.includes(userId)}"
                            dense>
                            <q-item-section avatar>
                                <q-icon color="primary" name="bluetooth"></q-icon>
                            </q-item-section>
                            <q-item-section @click="addUser(userId)">{{ user.display_name }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </q-card-section>
            <q-card-section class="row">
                <q-btn
                    label="戻る"
                    flat
                    @click="showAddUsers = false">
                </q-btn>
                <q-space></q-space>
                <q-btn 
                    color="primary"
                    label="決定" 
                    flat
                    @click="add">
                </q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import { useShowing } from '../store/showing';
import { useUsers } from '../store/users'
import { useAddChannel } from '../composables/useAddChannel'

const token = inject('token', '')
const { showAddChannelModal } = useShowing()
const { serachUsers } = useUsers()

const { 
    showAddUsers, 
    channelName, 
    users,
    serachName,
    canUseChannelName, 
    nextStep,
    add,
    addUser,
    closeModal,
} = useAddChannel()

const a = () => {
    console.log('vjak')
}
// const f = fetchStoreChannel({ token, body: '' })
</script>