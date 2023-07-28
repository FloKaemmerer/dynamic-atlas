<script setup lang="ts">
import { ref } from 'vue'
import NumberOfBossesFilter from '@/components/filter_drawer/filters/boss_filters/NumberOfBossesFilter.vue'
import PhasedBossesFilter from '@/components/filter_drawer/filters/boss_filters/PhasedBossesFilter.vue'
import SkippablePhasesFilter from '@/components/filter_drawer/filters/boss_filters/SkippablePhasesFilter.vue'
import SpawnIntroFilter from '@/components/filter_drawer/filters/boss_filters/SpawnIntroFilter.vue'
import SpawnedBossesFilter from '@/components/filter_drawer/filters/boss_filters/SpawnedBossesFilter.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterStore } from '@/store/FilterStore'

const activeFiltersStore = useActiveFiltersStore()
const filterStore = useFilterStore()

const activeBossFilters = ref(activeFiltersStore.activeBossFilters.length)
const panel = ref()

activeFiltersStore.$subscribe((mutation, state) => {
  if (state.activeBossFilters.length !== activeBossFilters.value) {
    activeBossFilters.value = state.activeBossFilters.length
  }
})

function clearActiveBossFilters() {
  filterStore.CLEAR_BOSS_FILTERS()
  panel.value = []
  setTimeout(() => {
    panel.value = []
  }, 50)
}
</script>

<template>
  <v-expansion-panel rounded="0" bg-color="black" color="amber-lighten-5" value="bossPanel">
    <v-expansion-panel-title class="text-subtitle-1 text-amber-lighten-5">
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          Boss Filters
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="activeBossFilters > 0" class="d-inline-flex align-center justify-end text-overline pr-2" cols="5">
            Active: {{ activeBossFilters }}
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  icon="mdi-close-circle"
                  density="compact"
                  size="x-small"
                  v-bind="props"
                  class="ml-2"
                  variant="text"
                  :disabled="activeBossFilters < 1"
                  @click="clearActiveBossFilters()"
                />
              </template>
              <p>Clear Active Boss Filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="text-amber-lighten-5">
      <NumberOfBossesFilter />
      <PhasedBossesFilter />
      <SkippablePhasesFilter />
      <SpawnIntroFilter />
      <SpawnedBossesFilter />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
