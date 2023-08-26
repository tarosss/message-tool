<template>
    <q-item 
        dense
        class="left-nav-row cursor-pointer row items-center"
        :class="{'left-nav-row-showing': showing.showing.value == props._id}"
        @click="clicked">
        <div>
            <q-icon 
                class="q-mr-sm"
                name="circle"></q-icon>
            <span class="">
                {{ props.title }}
            </span>

        </div>
    </q-item>
</template>
<script lang="ts" setup>
import { useShowing } from '../store/showing'

const props = defineProps<{
    _id: string,
    title: string,
}>()

const showing = useShowing()
const clicked = () => {
    showing.setShowing(props._id)
}



</script>
