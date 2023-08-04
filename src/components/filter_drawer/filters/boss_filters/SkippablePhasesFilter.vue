<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeSkippablePhases"
    name="skippablephasesboss"
    checkbox-label="Bosses with skippable phases"
  />
</template>

<style scoped>

</style>
