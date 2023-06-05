<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let includeSpawnIntro = ref(filterStore.includeSpawnIntro)

filterStore.$subscribe((mutation, state) => {
    if (state.includeSpawnIntro != includeSpawnIntro.value) {
        includeSpawnIntro.value = state.includeSpawnIntro
    }
})

function handleIncludeSpawnIntroFilter() {
    filterStore.SET_INCLUDE_SPAWN_INTRO(!includeSpawnIntro.value)
}
</script>

<template>
    <v-checkbox label="Include Bosses With Spawn-Intro"
                v-model="includeSpawnIntro"
                @click="handleIncludeSpawnIntroFilter()"
                density="compact"
                :disabled="!filterStore.excludePhasedBosses"></v-checkbox>
</template>

<style scoped>

</style>