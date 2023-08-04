<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().includeSpawnIntro"
    name="spawnintroboss"
    checkbox-label="Include bosses with spawn-intro"
  />
</template>

<style scoped>

</style>
