<template>
    <q-list>
        <q-item 
            v-for="[userId, user] of serachUsers(props.serachName)">
            
        </q-item>
    </q-list>
</template>
<script lang="ts" setup>
import { useUsers } from '../store/users'

const props = defineProps<{
    serachName: string,
}>()

const { serachUsers } = useUsers()

</script>