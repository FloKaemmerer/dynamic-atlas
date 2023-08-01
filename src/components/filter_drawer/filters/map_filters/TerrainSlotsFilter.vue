<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeTerrainSlots = ref(filterStore.GET_SELECTED_FILTER().includeTerrainSlots)
const terrainSlots = ref(filterStore.GET_SELECTED_FILTER().terrainSlots)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeTerrainSlots !== includeTerrainSlots.value) {
    includeTerrainSlots.value = state.filters[state.currentSelectedFilterIndex].includeTerrainSlots
  }
  if (state.filters[state.currentSelectedFilterIndex].terrainSlots !== terrainSlots.value) {
    terrainSlots.value = state.filters[state.currentSelectedFilterIndex].terrainSlots
  }
})

function handleIncludeTerrainSlotsFilter() {
  filterStore.GET_SELECTED_FILTER().includeTerrainSlots = !includeTerrainSlots.value
  if (filterStore.GET_SELECTED_FILTER().includeTerrainSlots && filterStore.GET_SELECTED_FILTER().terrainSlots === undefined) {
    filterStore.GET_SELECTED_FILTER().terrainSlots = [0, 10]
  }
}

function debounceTerrainSlotsFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().terrainSlots === undefined) {
    filterStore.GET_SELECTED_FILTER().terrainSlots = value
  }
  // @ts-expect-error within 'debounceBacktrackFactorFilter' mapTier can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().terrainSlots[0] || value[1] !== filterStore.GET_SELECTED_FILTER().terrainSlots[1]) {
    filterStore.GET_SELECTED_FILTER().terrainSlots = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Terrain Slots
      <v-tooltip
        text="The number of slots within the map terrain, which can spawn a League Mechanic, aka the juiceability of a Map."
      >
        <template #activator="{ props }">
          <v-icon icon="mdi-information-outline" v-bind="props" />
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeTerrainSlots"
        density="compact"
        @click="handleIncludeTerrainSlotsFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="terrainSlots"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :min="0"
        :disabled="!includeTerrainSlots"
        @update:model-value="value => debounceTerrainSlotsFilter(value)"
      >
        <template #prepend>
          Low
        </template>
        <template #append>
          High
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
