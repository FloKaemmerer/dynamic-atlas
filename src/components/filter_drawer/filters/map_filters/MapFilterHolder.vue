<script setup lang="ts">
import { computed } from 'vue'
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

const mapFiltersCount = computed(() => activeFiltersStore.activeMapFilters.length)
</script>

<template>
  <v-expansion-panel value="mapPanel">
    <v-expansion-panel-title class="text-subtitle-1">
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          Map Filters
          <v-fade-transition leave-absolute>
            <span v-if="mapFiltersCount > 0" class="ml-1">({{ mapFiltersCount }})</span>
          </v-fade-transition>
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="mapFiltersCount > 0" class="d-inline-flex justify-end align-center" cols="5">
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  size="x-small"
                  class="px-3"
                  color="info"
                  v-bind="props"
                  flat
                  :disabled="mapFiltersCount < 1"
                  @click.stop.prevent="filterStore.CLEAR_MAP_FILTERS()"
                >
                  Clear
                  <!-- <v-icon icon="mdi-window-close" /> -->
                </v-btn>
              </template>
              <p>Clear all map filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
      <template #actions="{ expanded }">
        <v-icon :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'" />
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="">
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
