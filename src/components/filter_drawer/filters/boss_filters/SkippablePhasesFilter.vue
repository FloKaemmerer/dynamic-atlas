<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const includeSkippablePhases = ref(filterStore.includeSkippablePhases)

filterStore.$subscribe((mutation, state) => {
  if (state.includeSkippablePhases !== includeSkippablePhases.value) {
    includeSkippablePhases.value = state.includeSkippablePhases
  }
})

function handleIncludeSkippablePhasesFilter() {
  filterStore.SET_INCLUDE_SKIPPABLE_PHASES(!includeSkippablePhases.value)
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
