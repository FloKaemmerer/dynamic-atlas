<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeNumberOfBosses = ref(filterStore.GET_SELECTED_FILTER().includeNumberOfBosses)
const numberOfBosses = ref(filterStore.GET_SELECTED_FILTER().numberOfBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.includeNumberOfBosses !== includeNumberOfBosses.value) {
    includeNumberOfBosses.value = state.filters[state.currentSelectedFilterIndex].includeNumberOfBosses
  }
  if (state.numberOfBosses !== numberOfBosses.value) {
    numberOfBosses.value = state.filters[state.currentSelectedFilterIndex].numberOfBosses
  }
})

function handleIncludeNumberOfBossesFilter() {
  filterStore.GET_SELECTED_FILTER().includeNumberOfBosses = !includeNumberOfBosses.value
  if (filterStore.GET_SELECTED_FILTER().includeNumberOfBosses && filterStore.GET_SELECTED_FILTER().numberOfBosses === undefined) {
    filterStore.GET_SELECTED_FILTER().numberOfBosses = [0, 10]
  }
}

function debounceNumberOfBossesFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().numberOfBosses === undefined) {
    filterStore.GET_SELECTED_FILTER().numberOfBosses = value
  }
  // @ts-expect-error within 'debounceNumberOfBossesFilter' numberOfBosses can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().numberOfBosses[0] || value[1] !== filterStore.GET_SELECTED_FILTER().numberOfBosses[1]) {
    filterStore.GET_SELECTED_FILTER().numberOfBosses = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Number of Bosses
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeNumberOfBosses"
        density="compact"
        @click="handleIncludeNumberOfBossesFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="numberOfBosses"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="4"
        :min="0"
        :disabled="!includeNumberOfBosses"
        @update:model-value="value => debounceNumberOfBossesFilter(value)"
      >
        <template #prepend>
          0
        </template>
        <template #append>
          4
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
