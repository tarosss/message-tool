<template>
    <q-dialog v-model="show">
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
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps<{
    show: boolean,
}>()

const show = ref(props.show)
watchEffect(() => {
    console.log(props.show)
    show.value = props.show
})
</script>
