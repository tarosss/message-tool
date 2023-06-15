<template>
    <div>    
        <span >変更 {{ p }}</span>
        <p>
            {{ x }}
        </p>
        <p>
        </p>
        <p>
            {{ y }}
        </p>
    </div>
</template>
<script setup lang="ts">
import { directive } from "@babel/types";
import { computed, defineComponent, ref, onMounted, onUnmounted, watch, watchEffect } from "vue";
import { useStore } from 'vuex'
import {useMouse} from './mouse'
const app2 = 'app2'
const store = useStore()
const p = 1

const {x,y} = useMouse()
console.log(x.value,y.value);

// watchEffect(() => {
//     const temp = x.value
//     console.log('watch');
    
// })


// console.log(computed(() => x.value));


// export default defineComponent({
//     props: {
//         p: String
//     },
//     setup(props) {
//         const p = ref(props.p)

//         return {
//             p
//         }
//     }
// })


</script>