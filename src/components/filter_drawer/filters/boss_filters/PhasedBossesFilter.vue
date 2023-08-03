<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.excludePhasedBosses"
    name="excludephaseboss"
    checkbox-label="Exclude Phased Bosses"
  />
</template>

<style scoped>

</style>
