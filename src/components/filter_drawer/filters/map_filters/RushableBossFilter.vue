<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

function handleCheckBoxUpdate(active: boolean) {
  if (!active) {
    filterStore.GET_SELECTED_FILTER().rushableBoss = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().rushableBoss"
    tooltip="A Boss is considered rushable, if it is easy and/or predictable to reach eg. Mesa or Dunes"
    name="rushableboss"
    checkbox-label="Rushable Boss"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
</template>

<style scoped>

</style>
