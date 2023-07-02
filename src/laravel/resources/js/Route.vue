<template>
    <router-link to="/">Home</router-link>
    <router-link to="/about">Edit</router-link>
    <router-view />
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';
// props = defineProps

// const props = defineProps<{
//     data: {
//         _id: string,
//         message: string,
//         storage: string,
//         sended: string,
//         created_at: string,
//         updated_at: string,
//     }[]
// }>()
// console.log(props.data);
</script>
