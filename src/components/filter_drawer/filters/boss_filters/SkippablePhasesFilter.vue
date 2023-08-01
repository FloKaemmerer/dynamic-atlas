<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const includeSkippablePhases = ref(filterStore.GET_SELECTED_FILTER().includeSkippablePhases)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeSkippablePhases !== includeSkippablePhases.value) {
    includeSkippablePhases.value = state.filters[state.currentSelectedFilterIndex].includeSkippablePhases
  }
  if (state.includeSkippablePhases !== includeSkippablePhases.value) {
    includeSkippablePhases.value = state.includeSkippablePhases
  }
})

function handleIncludeSkippablePhasesFilter() {
  if (!includeSkippablePhases.value) {
    filterStore.GET_SELECTED_FILTER().includeSkippablePhases = true
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeSkippablePhases = undefined
  }
}
</script>

<template>
  <v-checkbox
    v-model="includeSkippablePhases"
    label="Include Bosses With skippable Phases" density="compact"
    :disabled="!filterStore.GET_SELECTED_FILTER().excludePhasedBosses"
    @click="handleIncludeSkippablePhasesFilter()"
  />
</template>

<style scoped>

</style>
