<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().mapTier === undefined) {
    filterStore.GET_SELECTED_FILTER().mapTier = [1, 16]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeMapTier = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeMapTier"
    v-model:rangeSlider="filterStore.GET_SELECTED_FILTER().mapTier"
    :range-slider-min="1"
    :range-slider-max="16"
    range-slider-label-prepend="T1"
    range-slider-label-append="T16"
    name="maptier"
    checkbox-label="Map Tier"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
