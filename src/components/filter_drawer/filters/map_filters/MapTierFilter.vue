<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeMapTier"
    v-model:rangeSlider="filterStore.mapTier"
    :range-slider-min="1"
    :range-slider-max="16"
    :range-slider-label-prepend="`T${filterStore.mapTier[0]}`"
    :range-slider-label-append="`T${filterStore.mapTier[1]}`"
    name="maptier"
    checkbox-label="Map Tier"
  />
</template>

<style scoped>

</style>
