<script setup lang="ts">
import { computed } from 'vue'
import NumberOfBossesFilter from '@/components/filter_drawer/filters/boss_filters/NumberOfBossesFilter.vue'
import PhasedBossesFilter from '@/components/filter_drawer/filters/boss_filters/PhasedBossesFilter.vue'
import SpawnedBossesFilter from '@/components/filter_drawer/filters/boss_filters/SpawnedBossesFilter.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterStore } from '@/store/FilterStore'

const activeFiltersStore = useActiveFiltersStore()
const filterStore = useFilterStore()

const bossFiltersCount = computed(() => activeFiltersStore.activeBossFilters.length)
</script>

<template>
  <v-expansion-panel value="bossPanel">
    <v-expansion-panel-title id="bossPanel" class="text-subtitle-1 ">
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          Boss Filters
          <v-fade-transition leave-absolute>
            <span v-if="bossFiltersCount > 0" class="ml-1">({{ bossFiltersCount }})</span>
          </v-fade-transition>
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="bossFiltersCount > 0" class="d-inline-flex align-center justify-end text-overline pr-2" cols="5">
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  size="x-small"
                  class="px-3"
                  color="info"
                  v-bind="props"
                  :flat="true"

                  :disabled="bossFiltersCount < 1"
                  @click="filterStore.CLEAR_BOSS_FILTERS()"
                >
                  Clear
                </v-btn>
              </template>
              <p>Clear all boss filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
      <template #actions="{ expanded }">
        <v-icon :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'" />
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <NumberOfBossesFilter />
      <PhasedBossesFilter />

      <SpawnedBossesFilter />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
