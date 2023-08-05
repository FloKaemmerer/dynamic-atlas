<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().traversability === undefined) {
    filterStore.GET_SELECTED_FILTER().traversability = [0, 10]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeTraversability = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeTraversability"
    v-model:rangeSliderValues="filterStore.GET_SELECTED_FILTER().traversability"
    tooltip="Traversability is the factor how easy it is to traverse the map using a skill like Shield Charge"
    :range-slider-max="10"
    range-slider-label-prepend="Difficult"
    range-slider-label-append="Easy"
    name="traversability"
    checkbox-label="Traversability"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
