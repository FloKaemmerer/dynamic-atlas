<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeSkippablePhases"
    name="skippablephasesboss"
    checkbox-label="Bosses with skippable phases"
  />
</template>

<style scoped>

</style>
