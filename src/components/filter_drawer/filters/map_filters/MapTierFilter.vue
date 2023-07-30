<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeMapTier = ref(filterStore.GET_SELECTED_FILTER().includeMapTier)
const mapTier = ref(filterStore.GET_SELECTED_FILTER().mapTier)

filterStore.$subscribe((mutation, state) => {
  if (state.includeMapTier !== includeMapTier.value) {
    includeMapTier.value = state.filters[state.currentSelectedFilterIndex].includeMapTier
    includeMapTier.value = state.includeMapTier
  }
  if (state.mapTier !== mapTier.value) {
    mapTier.value = state.filters[state.currentSelectedFilterIndex].mapTier
    mapTier.value = state.mapTier
  }
})

function handleIncludeMapTierFilter() {
  filterStore.SET_INCLUDE_MAP_TIER(!includeMapTier.value)
  filterStore.GET_SELECTED_FILTER().includeMapTier = !includeMapTier.value
  if (filterStore.GET_SELECTED_FILTER().includeMapTier && filterStore.GET_SELECTED_FILTER().mapTier === undefined) {
    filterStore.GET_SELECTED_FILTER().mapTier = [1, 16]
  }
}

function debounceMapTierFilter(value: [number, number]) {
  if (!(value[0] === filterStore.mapTier[0] && value[1] === filterStore.mapTier[1])) {
    filterStore.SET_MAP_TIER(value)
    filterStore.GET_SELECTED_FILTER().mapTier = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Map Tier
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeMapTier"
        density="compact"
        @click="handleIncludeMapTierFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        id="mapTierFilter"
        v-model="mapTier"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="16"
        :min="1"
        :disabled="!includeMapTier"
        @update:model-value="value => debounceMapTierFilter(value)"
      >
        <template #prepend>
          1
        </template>
        <template #append>
          16
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
