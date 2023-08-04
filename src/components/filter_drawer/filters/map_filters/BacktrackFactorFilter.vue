<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
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
  />
</template>

<style scoped>

</style>
