<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().linearity === undefined) {
    filterStore.GET_SELECTED_FILTER().linearity = [0, 10]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeLinearity = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeLinearity"
    v-model:rangeSlider="filterStore.GET_SELECTED_FILTER().linearity"
    tooltip="High linearity is a map with a single more or less narrow path to be followed ex. Alleyways or Malformation"
    :range-slider-max="10"
    range-slider-label-prepend="Non-linear"
    range-slider-label-append="Linear"
    name="linearity"
    checkbox-label="Linearity"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
