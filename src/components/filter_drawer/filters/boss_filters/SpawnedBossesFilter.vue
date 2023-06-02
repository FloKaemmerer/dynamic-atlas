<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let excludeSpawnedBosses = ref(filterStore.excludeSpawnedBosses)

function handleExcludeSpawnedBossesFilter() {
    filterStore.SET_EXCLUDE_SPAWNED_BOSSES(!excludeSpawnedBosses.value)
}
</script>

<template>
    <v-checkbox label="Exclude Spawned Bosses"
                v-model="excludeSpawnedBosses"
                @click="handleExcludeSpawnedBossesFilter()"
                density="compact"></v-checkbox>
</template>

<style scoped>

</style>