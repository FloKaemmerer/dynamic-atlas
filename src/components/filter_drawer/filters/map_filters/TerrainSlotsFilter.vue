<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (active && filterStore.GET_SELECTED_FILTER().terrainSlots === undefined) {
    filterStore.GET_SELECTED_FILTER().terrainSlots = [0, 10]
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeTerrainSlots = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeTerrainSlots"
    v-model:rangeSliderValues="filterStore.GET_SELECTED_FILTER().terrainSlots"
    tooltip="The number of slots within the map terrain, which can spawn a league mechanic, aka the juiceability of a map."
    :range-slider-min="0"
    :range-slider-max="10"
    range-slider-label-prepend="Low"
    range-slider-label-append="High"
    name="terrainslots"
    checkbox-label="Terrain Slots"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
