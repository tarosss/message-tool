<template>
    <q-dialog v-model="showAddDirectMessageModal">
        <q-card>
            <q-card-section class="row">
                <span class="text-h5">
                    ダイレクトメッセージを追加する
                </span>
                <q-space></q-space>
                <q-btn
                    icon="close"
                    flat
                    @click="showAddDirectMessageModal = false">
                </q-btn>
            </q-card-section>
            <q-card-section>
                <q-input 
                    v-model="serachName" 
                    placeholder="名前"
                    outlined>
                </q-input>
                <q-card 
                    v-if="anotherUser !== undefined">
                    <span>
                        {{ anotherUser.display_name }}
                    </span>
                </q-card>
                <q-card v-if="serachName !== '' && showSerachUsers">
                    <q-list>
                        <q-item
                            v-for="[userId, user] of serachUsers(serachName)"
                            :key="'add-direct-message-' + userId"
                            class="cursor-pointer"
                            :class="{'bg-red': userId === anotherUserId}"
                            :disable="userIdsAlreadyCreatedDirectMessage.includes(userId)"
                            dense>
                            <q-item-section avatar>
                                <q-icon color="primary" name="bluetooth"></q-icon>
                            </q-item-section>
                            <q-item-section @click="selectAnotherUser(userId)">
                                {{ user.display_name }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </q-card-section>
            <q-card-section class="row justify-end">
                <q-btn
                    label="作成する"
                    flat
                    :disable="!canCreateDirectMessage"
                    @click="createDirectMessage">
                </q-btn>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { useShowing } from '../store/showing'
import { useUsers } from '../store/users'
import { useChannels } from '../store/channels'
import { useAddDirectMessage } from '../composables/useAddDirectMesssage'

const { serachUsers } = useUsers()
const { showAddDirectMessageModal } = useShowing()
const { userIdsAlreadyCreatedDirectMessage } = useChannels()
const { 
    showSerachUsers, 
    serachName, 
    anotherUser,
    anotherUserId,
    canCreateDirectMessage,
    selectAnotherUser, 
    createDirectMessage,
} = useAddDirectMessage()
</script>
