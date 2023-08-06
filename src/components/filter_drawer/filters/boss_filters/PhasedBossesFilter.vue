<script setup lang="ts">
import GenericFilter from '@/components/generics/GenericFilter.vue'
import { useFilterStore } from '@/store/FilterStore'
import SpawnIntroFilter from '@/components/filter_drawer/filters/boss_filters/SpawnIntroFilter.vue'
import SkippablePhasesFilter from '@/components/filter_drawer/filters/boss_filters/SkippablePhasesFilter.vue'

const filterStore = useFilterStore()
function handleCheckBoxUpdate(active: boolean) {
  if (!active) {
    filterStore.GET_SELECTED_FILTER().excludePhasedBosses = undefined
    filterStore.GET_SELECTED_FILTER().includeSkippablePhases = undefined
    filterStore.GET_SELECTED_FILTER().includeSpawnIntro = undefined
  }
}
</script>

<template>
  <GenericFilter
    v-model:checkbox="filterStore.GET_SELECTED_FILTER().excludePhasedBosses"
    name="excludephaseboss"
    checkbox-label="Exclude Phased Bosses"
    @update:checkbox="active => handleCheckBoxUpdate(active)"
  />
  <SkippablePhasesFilter v-if="filterStore.GET_SELECTED_FILTER().excludePhasedBosses" />
  <SpawnIntroFilter v-if="filterStore.GET_SELECTED_FILTER().excludePhasedBosses" />
</template>

<style scoped>

</style>
