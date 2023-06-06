<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let includeSkippablePhases = ref(filterStore.includeSkippablePhases)

filterStore.$subscribe((mutation, state) => {
    if (state.includeSkippablePhases != includeSkippablePhases.value) {
        includeSkippablePhases.value = state.includeSkippablePhases
    }
})

function handleIncludeSkippablePhasesFilter() {
    filterStore.SET_INCLUDE_SKIPPABLE_PHASES(!includeSkippablePhases.value)
}

</script>

<template>
    <v-checkbox label="Include Bosses With skippable Phases"
                v-model="includeSkippablePhases" density="compact"
                @click="handleIncludeSkippablePhasesFilter()"
                :disabled="!filterStore.excludePhasedBosses"></v-checkbox>
</template>

<style scoped>

</style>