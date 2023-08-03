<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeNumberOfBosses"
    v-model:rangeSlider="filterStore.numberOfBosses"
    :range-slider-min="0"
    :range-slider-max="4"
    :range-slider-label-prepend="filterStore.numberOfBosses[0]"
    :range-slider-label-append="filterStore.numberOfBosses[1]"
    name="numberofbosses"
    checkbox-label="Number of Bosses"
  />
</template>

<style scoped>

</style>
