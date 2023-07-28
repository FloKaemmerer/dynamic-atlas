<script setup lang="ts">
import { ref } from 'vue'
import MapTierFilter from '@/components/filter_drawer/filters/map_filters/MapTierFilter.vue'
import OpennessFilter from '@/components/filter_drawer/filters/map_filters/OpennessFilter.vue'
import TraversabilityFilter from '@/components/filter_drawer/filters/map_filters/TraversabilityFilter.vue'
import BacktrackFactorFilter from '@/components/filter_drawer/filters/map_filters/BacktrackFactorFilter.vue'
import LinearityFilter from '@/components/filter_drawer/filters/map_filters/LinearityFilter.vue'
import RushableBossFilter from '@/components/filter_drawer/filters/map_filters/RushableBossFilter.vue'
import BaseMobCountFilter from '@/components/filter_drawer/filters/map_filters/BaseMobCountFilter.vue'
import TerrainSlotsFilter from '@/components/filter_drawer/filters/map_filters/TerrainSlotsFilter.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterStore } from '@/store/FilterStore'

const activeFiltersStore = useActiveFiltersStore()
const filterStore = useFilterStore()

const activeMapFilters = ref(activeFiltersStore.activeMapFilters.length)
const panel = ref()

activeFiltersStore.$subscribe((mutation, state) => {
  if (state.activeMapFilters.length !== activeMapFilters.value) {
    activeMapFilters.value = state.activeMapFilters.length
  }
})

function clearActiveMapFilters() {
  filterStore.CLEAR_MAP_FILTERS()
  panel.value = []
  setTimeout(() => {
    panel.value = []
  }, 10)
}
</script>

<template>
  <v-expansion-panel rounded="0" bg-color="black" color="amber-lighten-5" value="mapPanel">
    <v-expansion-panel-title class="text-subtitle-1 text-amber-lighten-5">
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          Map Filters
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="activeMapFilters > 0" class="d-inline-flex align-center justify-end text-overline pr-2" cols="5">
            Active: {{ activeMapFilters }}
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  icon="mdi-close-circle"
                  density="compact"
                  size="x-small"
                  v-bind="props"
                  class="ml-2"
                  variant="text"
                  :disabled="activeMapFilters < 1"
                  @click="clearActiveMapFilters()"
                />
              </template>
              <p>Clear Active Map Filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="text-amber-lighten-5">
      <MapTierFilter />
      <OpennessFilter />
      <TraversabilityFilter />
      <BacktrackFactorFilter />
      <LinearityFilter />
      <TerrainSlotsFilter />
      <BaseMobCountFilter />
      <RushableBossFilter />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
