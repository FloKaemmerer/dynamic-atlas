<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (!active) {
    filterStore.GET_SELECTED_FILTER().includeSkippablePhases = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeSkippablePhases"
    name="skippablephasesboss"
    checkbox-label="Include Bosses with skippable phases"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
