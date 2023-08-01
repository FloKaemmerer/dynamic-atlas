<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeSpawnIntro = ref(filterStore.GET_SELECTED_FILTER().includeSpawnIntro)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeSpawnIntro !== includeSpawnIntro.value) {
    includeSpawnIntro.value = state.filters[state.currentSelectedFilterIndex].includeSpawnIntro
  }
})

function handleIncludeSpawnIntroFilter() {
  if (!includeSpawnIntro.value) {
    filterStore.GET_SELECTED_FILTER().includeSpawnIntro = true
  }
  else {
    filterStore.GET_SELECTED_FILTER().includeSpawnIntro = undefined
  }
}
</script>

<template>
  <v-checkbox
    v-model="includeSpawnIntro"
    label="Include Bosses With Spawn-Intro"
    density="compact"
    :disabled="!filterStore.GET_SELECTED_FILTER().excludePhasedBosses"
    @click="handleIncludeSpawnIntroFilter()"
  />
</template>

<style scoped>

</style>
