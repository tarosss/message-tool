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
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import { useShowing } from '../store/showing'
import { useAddDirectMessage } from '../composables/useAddDirectMesssage'

const { showAddDirectMessageModal } = useShowing()
const { serachName } = useAddDirectMessage()
</script>
