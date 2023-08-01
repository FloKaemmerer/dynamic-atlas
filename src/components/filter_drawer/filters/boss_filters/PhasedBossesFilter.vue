<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const excludePhasedBosses = ref(filterStore.GET_SELECTED_FILTER().excludePhasedBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].excludePhasedBosses !== excludePhasedBosses.value) {
    excludePhasedBosses.value = state.filters[state.currentSelectedFilterIndex].excludePhasedBosses
  }
})

function handleExcludePhasedBossesFilter() {
  if (!excludePhasedBosses.value) {
    filterStore.GET_SELECTED_FILTER().excludePhasedBosses = true
  }
  else {
    filterStore.GET_SELECTED_FILTER().excludePhasedBosses = undefined
    filterStore.GET_SELECTED_FILTER().includeSkippablePhases = undefined
    filterStore.GET_SELECTED_FILTER().includeSpawnIntro = undefined
  }
}
</script>

<template>
  <v-checkbox
    v-model="excludePhasedBosses"
    label="Exclude Phased Bosses"
    density="compact"
    @click="handleExcludePhasedBossesFilter()"
  />
</template>

<style scoped>

</style>
