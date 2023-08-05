<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.includeSpawnIntro"
    name="spawnintroboss"
    checkbox-label="Include bosses with spawn-intro"
  />
</template>

<style scoped>

</style>
