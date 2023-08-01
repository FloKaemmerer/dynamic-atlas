<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const excludeSpawnedBosses = ref(filterStore.excludeSpawnedBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.excludeSpawnedBosses !== excludeSpawnedBosses.value) {
    excludeSpawnedBosses.value = state.excludeSpawnedBosses
  }
})

function handleExcludeSpawnedBossesFilter() {
  filterStore.SET_EXCLUDE_SPAWNED_BOSSES(!excludeSpawnedBosses.value)
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
