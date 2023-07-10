<template>
    <div v-for="channel in storeChannels.channels.value" :key="'chanel' + channel._id">
        {{ channel._id }}
    </div>

    <div @click="clicked">div</div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useChannels } from '../store/channels';
import { useSample } from '../store/sample'
import { onMounted, watchEffect } from 'vue';
// channels.then(v => {
//     console.log(v)
// })
const storeChannels = storeToRefs(useChannels())

watchEffect(() => {
    console.log(storeChannels.channels.value)
})
const clicked = () => {
    console.log('clicked')
    useChannels().setChannels([{_id:'jks', channel_type: 1, channel_name:'ciak'}])
}
// channels.
// channels.channels.value
// channels.channels.value.forEach(element => {
//     console.log(ele)
// });
// channels.then(response => {
//     // console.log(response)
//     console.log(response.channels.value)
        
//     response.channels.value.forEach(e => {
//         console.log()
//     })
// })
</script>
