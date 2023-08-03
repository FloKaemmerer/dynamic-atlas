<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeOpenness"
    v-model:rangeSlider="filterStore.openness"
    tooltip="How open the map is ex. Tower is very narrow, while Dunes is very open"
    :range-slider-max="10"
    range-slider-label-prepend="Narrow"
    range-slider-label-append="Open"
    name="openness"
    checkbox-label="Openness"
  />
</template>

<style scoped>

</style>
