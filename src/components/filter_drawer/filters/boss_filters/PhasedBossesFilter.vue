<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const excludePhasedBosses = ref(filterStore.excludePhasedBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.excludePhasedBosses !== excludePhasedBosses.value) {
    excludePhasedBosses.value = state.excludePhasedBosses
  }
})

function handleExcludePhasedBossesFilter() {
  filterStore.SET_EXCLUDE_PHASED_BOSSES(!excludePhasedBosses.value)
}
</script>

<template>
  <v-checkbox
    v-model="excludePhasedBosses"
    label="Exclude Phased Bosses"
    density="compact"
    @click="handleExcludePhasedBossesFilter()"
  />
</template>

<style scoped>

</style>
