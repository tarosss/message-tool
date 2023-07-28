<template>
    <div class="message-input" ref="dropZone">
        <textarea
            v-model="message"
            ref="textZone"
            rows="1"
            :placeholder="props.channel.channel_name + 'へのメッセージ'"
            :style="{
                height: textZoneHeight,
            }">
        </textarea>
        <div class="message-input-footer">
            <div>

            </div>
            <p>
                <v-icon
                    :icon="mdiSendVariant"
                    @click="sendMessage">
                </v-icon>  
            </p>
        </div>

        <!-- <div v-for="file in files" :key="file.name">
            {{ file.name }}
        </div> -->
        <input type="file" class="message-input-file">
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { BeforeFetchContext, createFetch } from '@vueuse/core';
import { mdiSendVariant } from '@mdi/js';
import { useMessage } from '../composables/useMessage'
import { useDropZone } from '../composables/useDropZone';

const { message, files, dropZone, textZone, textZoneHeight, canSend, isOverDropZone} = useMessage()

const props = defineProps<{
    channel: Channel
}>()

const injectToken = function ({ options }: BeforeFetchContext) {
  options.headers = {
    ...options.headers,
    Authorization: `649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV`
  }

  return { options }
}

const sendMessage = () => {
    if (!canSend) {
        return
    }
    // useFetch('api/store/message')
    const fetch = createFetch({
        // baseUrl: 'api',
        options: {
            async beforeFetch({ options }) {
                const myToken = '649c0e13f397e2b93b0bb862|1Q80MexMcGX3c4wiW6cjhzVmrxQcrAuwfXqSr2SV'
                options.headers.Authorization = `Bearer ${myToken}`

                return { options }
            },
        }
    })

    const a = fetch('api/store/message').post({c:'a'})
    console.log(a)
}
</script>