<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().numberOfBosses === undefined) {
    filterStore.GET_SELECTED_FILTER().numberOfBosses = [0, 4]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeNumberOfBosses = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeNumberOfBosses"
    v-model:rangeSlider="filterStore.GET_SELECTED_FILTER().numberOfBosses"
    :range-slider-min="0"
    :range-slider-max="4"
    :range-slider-label-prepend="0"
    :range-slider-label-append="4"
    name="numberofbosses"
    checkbox-label="Number of Bosses"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
