<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().openness === undefined) {
    filterStore.GET_SELECTED_FILTER().openness = [0, 10]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeOpenness = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeOpenness"
    v-model:rangeSlider="filterStore.GET_SELECTED_FILTER().openness"
    tooltip="How open the map is ex. Tower is very narrow, while Dunes is very open"
    :range-slider-max="10"
    range-slider-label-prepend="Narrow"
    range-slider-label-append="Open"
    name="openness"
    checkbox-label="Openness"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
