<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeTraversability"
    v-model:rangeSlider="filterStore.traversability"
    tooltip="Traversability is the factor how easy it is to traverse the map using a skill like Shield Charge"
    :range-slider-max="10"
    range-slider-label-prepend="Difficult"
    range-slider-label-append="Easy"
    name="traversability"
    checkbox-label="Traversability"
  />
</template>

<style scoped>

</style>
