<template>
    <div>
        app2

    
        <span @click="change">変更</span>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex'
const app2 = 'app2'
export default defineComponent({
    setup() {
        const store = useStore()
        console.log(store);
        
        const app = ref(1)

        const change = () => {
            console.log(1111);
            store.commit('addTen', 10000000)
        }
        return {
            app,
            name: computed(() => store.state.name),
            gacha: computed(() => store.state.gacha),
            change
        }
    }

})
</script>