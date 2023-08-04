<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeNumberOfBosses"
    v-model:rangeSliderValues="filterStore.GET_SELECTED_FILTER().numberOfBosses"
    :range-slider-min="0"
    :range-slider-max="4"
    :range-slider-label-prepend="0"
    :range-slider-label-append="4"
    name="numberofbosses"
    checkbox-label="Number of Bosses"
  />
</template>

<style scoped>

</style>
