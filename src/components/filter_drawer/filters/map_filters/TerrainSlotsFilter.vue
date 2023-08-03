<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeTerrainSlots"
    v-model:rangeSlider="filterStore.terrainSlots"
    tooltip="The number of slots within the map terrain, which can spawn a league mechanic, aka the juiceability of a map."
    :range-slider-min="0"
    :range-slider-max="10"
    range-slider-label-prepend="Low"
    range-slider-label-append="High"
    name="terrainslots"
    checkbox-label="Terrain Slots"
  />
</template>

<style scoped>

</style>
