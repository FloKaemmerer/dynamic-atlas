<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeTerrainSlots = ref(filterStore.includeTerrainSlots)
const terrainSlots = ref(filterStore.terrainSlots)

filterStore.$subscribe((mutation, state) => {
  if (state.includeTerrainSlots !== includeTerrainSlots.value) {
    includeTerrainSlots.value = state.includeTerrainSlots
  }
  if (state.terrainSlots !== terrainSlots.value) {
    terrainSlots.value = state.terrainSlots
  }
})

function handleIncludeTerrainSlotsFilter() {
  filterStore.SET_INCLUDE_TERRAIN_SLOTS(!includeTerrainSlots.value)
}

function debounceTerrainSlotsFilter(value: [number, number]) {
  if (!(value[0] === filterStore.terrainSlots[0] && value[1] === filterStore.terrainSlots[1])) {
    filterStore.SET_TERRAIN_SLOTS(value)
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
