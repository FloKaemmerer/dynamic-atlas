<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeLinearity"
    v-model:rangeSlider="filterStore.linearity"
    tooltip="High linearity is a map with a single more or less narrow path to be followed ex. Alleyways or Malformation"
    :range-slider-max="10"
    range-slider-label-prepend="Non-linear"
    range-slider-label-append="Linear"
    name="linearity"
    checkbox-label="Linearity"
  />
</template>

<style scoped>

</style>
