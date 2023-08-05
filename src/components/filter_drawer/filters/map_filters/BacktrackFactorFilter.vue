<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().backtrackFactor === undefined) {
    filterStore.GET_SELECTED_FILTER().backtrackFactor = [0, 10]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeBacktrackFactor = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeBacktrackFactor"
    v-model:rangeSliderValues="filterStore.GET_SELECTED_FILTER().backtrackFactor"
    tooltip="A low Backtrack factor means, that a map can be cleared without the need to backtrack"
    :range-slider-max="10"
    range-slider-label-prepend="None"
    range-slider-label-append="A lot"
    name="backtrack"
    checkbox-label="Backtrack Factor"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
