<template>
    <q-toolbar class="bg-black header">
        <q-space></q-space>
        <q-card 
            class="header-serach cursor-pointer q-px-sm row items-center"
            @click="showHeaderSearch=true">
            <q-space></q-space>
            <div>
                <q-icon name="search" size="sm"></q-icon>
                <span>チャンネル名を検索する</span>
            </div>
            <q-space></q-space>
            <q-btn icon="tune" square flat dense @click="clickTune"></q-btn>
            <q-menu 
                v-if="canShowHeaderSearch"
                cover >
                <q-card class="header-serach-card q-pa-sm">
                    <div class="row items-center">
                        <q-icon name="search" size="sm"></q-icon>
                        <q-input class="header-serach-card-text" outlined v-model="searchText" :dense="true" />
                        <q-space></q-space>
                        <q-btn icon="tune" @click="clickTune" square flat dense></q-btn>
                        <q-btn icon="close" square flat dense></q-btn>
                    </div>
                    <q-separator dark />
                </q-card>
            </q-menu>
        </q-card>
        <q-space></q-space>
        <q-btn icon="help" class="text-white" square flat dense></q-btn>
        <Avator></Avator>
    </q-toolbar>
    <q-dialog v-model="showSearchDialog">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Close icon</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Avator from './Avatar.vue'
import { useHeader } from '../composables/useHeader' 

const { searchText, showHeaderSearch, canShowHeaderSearch, showSearchDialog, setCanShowHeaderSearch,  clickTune } = useHeader()

</script>
