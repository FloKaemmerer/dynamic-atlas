<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();

let excludePhasedBosses = ref(false)

function handleExcludePhasedBossesFilter() {
    filterStore.SET_EXCLUDE_PHASED_BOSSES(!excludePhasedBosses.value)
}

</script>

<template>
    <v-checkbox label="Exclude Phased Bosses"
                v-model="excludePhasedBosses"
                @click="handleExcludePhasedBossesFilter()"
                density="compact"></v-checkbox>
</template>

<style scoped>

</style>