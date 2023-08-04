<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().excludeSpawnedBosses"
    name="excludespanedbosses"
    checkbox-label="Exclude Spawned Bosses"
  />
</template>

<style scoped>

</style>
