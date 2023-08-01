<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const excludeSpawnedBosses = ref(filterStore.GET_SELECTED_FILTER().excludeSpawnedBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].excludeSpawnedBosses !== excludeSpawnedBosses.value) {
    excludeSpawnedBosses.value = state.filters[state.currentSelectedFilterIndex].excludeSpawnedBosses
  }
})

function handleExcludeSpawnedBossesFilter() {
  if (!excludeSpawnedBosses.value) {
    filterStore.GET_SELECTED_FILTER().excludeSpawnedBosses = true
  }
  else {
    filterStore.GET_SELECTED_FILTER().excludeSpawnedBosses = undefined
  }
}
</script>

<template>
  <v-checkbox
    v-model="excludeSpawnedBosses"
    label="Exclude Spawned Bosses"
    density="compact"
    @click="handleExcludeSpawnedBossesFilter()"
  />
</template>

<style scoped>

</style>
