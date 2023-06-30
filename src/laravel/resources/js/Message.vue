<template>
    Message

    <button @click="clicked"></button>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import socket from './socket';

const connected = computed(() => socket.connected)
onMounted(() => {

})
const clicked = () => {
    socket.emit("message", 'こんにてゃ')
}

</script>./socketio/socket