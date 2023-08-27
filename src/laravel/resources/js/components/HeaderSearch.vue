<template>
    <q-card class="header-serach-card q-pa-sm">
        <div class="row items-center">
            <q-icon name="search" size="sm"></q-icon>
            <q-input class="header-serach-card-text" outlined v-model="a" :dense="true" />
            <q-space></q-space>
            <q-btn icon="tune" square flat dense></q-btn>
            <q-btn icon="close" square flat dense></q-btn>
        </div>
        <q-separator dark />
    </q-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const a = ref('')
</script>
