<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const includeSpawnIntro = ref(filterStore.includeSpawnIntro)

filterStore.$subscribe((mutation, state) => {
  if (state.includeSpawnIntro !== includeSpawnIntro.value) {
    includeSpawnIntro.value = state.includeSpawnIntro
  }
})

function handleIncludeSpawnIntroFilter() {
  filterStore.SET_INCLUDE_SPAWN_INTRO(!includeSpawnIntro.value)
}
</script>

<template>
  <v-checkbox
    v-model="includeSpawnIntro"
    label="Include Bosses With Spawn-Intro"
    density="compact"
    :disabled="!filterStore.excludePhasedBosses"
    @click="handleIncludeSpawnIntroFilter()"
  />
</template>

<style scoped>

</style>
