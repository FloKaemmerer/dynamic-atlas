<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeBaseMobCount"
    v-model:rangeSliderValues="filterStore.GET_SELECTED_FILTER().baseMobCount"
    tooltip="The base mob count of monsters present in the normal version of the map."
    :range-slider-min="1"
    :range-slider-max="10"
    range-slider-label-prepend="Low"
    range-slider-label-append="High"
    name="basemobcount"
    checkbox-label="Base Mob Count"
  />
</template>

<style scoped>

</style>
