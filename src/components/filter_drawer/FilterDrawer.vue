<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { initFilter } from '@/composable/filter/atlas-filter-handler'
import DivinationCardFilterHolder
  from '@/components/filter_drawer/filters/divination_card_filters/DivinationCardFilterHolder.vue'
import BossFilterHolder from '@/components/filter_drawer/filters/boss_filters/BossFilterHolder.vue'
import MapFilterHolder from '@/components/filter_drawer/filters/map_filters/MapFilterHolder.vue'
import TextFilterHolder from '@/components/filter_drawer/filters/text_filters/TextFilterHolder.vue'
import AtlasOverlayHolder from '@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue'
import { useFilterStore } from '@/store/FilterStore'
import type { LooseFilters } from '@/model/looseFilters'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import handleUrlQueryFilters from '@/composable/filter/url-query-filter-handler'
import FilterToolbar from '@/components/filter_drawer/FilterToolbar.vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'

const filterStore = useFilterStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const drawer = computed<boolean>(() => filterDrawerStore.drawer)

function queryFilters() {
  const queryFilters: LooseFilters = {}
  return {
    query: queryFilters,
    add: (condition: boolean, key: string, value: any): void => {
      if (condition) {
        queryFilters[key] = String(value)
      }
    },
  }
}
router.isReady().then(() => {
  initFilter()
  handleUrlQueryFilters(route.query)
})

function hasActiveFilter(state: any) {
  return (state.filters[state.currentSelectedFilterIndex].filterText !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].mapTier !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].openness !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].traversability !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].backtrackFactor !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].linearity !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].terrainSlots !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].baseMobCount !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].rushableBoss !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].numberOfBosses !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].excludePhasedBosses !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].includeSkippablePhases !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].includeSpawnIntro !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].excludeSpawnedBosses !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].minDivinationCardPrice !== undefined)
      || (state.filters[state.currentSelectedFilterIndex].minEffectiveDivinationCardValue !== undefined)
}

filterStore.$subscribe((_mutation, state) => {
  const filters = queryFilters()

  // ----- Map Filters -----
  // filters.add(Boolean(state.filterText && state.filterText.length > 0), 'filterText', state.filterText)
  // filters.add(hasToAddMapTier(state), 'mapTier', state.mapTier)
  // filters.add(state.openness[0] >= 0 && state.includeOpenness, 'openness', state.openness)
  filters.add(state.traversability[0] >= 0 && state.includeTraversability, 'traversability', state.traversability)
  filters.add(state.backtrackFactor[0] >= 0 && state.includeBacktrackFactor, 'backtrackFactor', state.backtrackFactor)
  filters.add(state.linearity[0] >= 0 && state.includeLinearity, 'linearity', state.linearity)
  filters.add(state.terrainSlots[0] >= 0 && state.includeTerrainSlots, 'terrainSlots', state.terrainSlots)
  filters.add(state.baseMobCount[0] >= 0 && state.includeBaseMobCount, 'baseMobCount', state.baseMobCount)
  filters.add(state.rushableBoss, 'rushableBoss', state.rushableBoss)
  // --------------------------

  // ------ Boss Filters ------
  filters.add(state.numberOfBosses[0] >= 0 && state.includeNumberOfBosses, 'numberOfBosses', state.numberOfBosses)
  filters.add(state.excludePhasedBosses, 'excludePhasedBosses', state.excludePhasedBosses)
  filters.add(state.includeSkippablePhases, 'includeSkippablePhases', state.includeSkippablePhases)
  filters.add(state.includeSpawnIntro, 'includeSpawnIntro', state.includeSpawnIntro)
  filters.add(state.excludeSpawnedBosses, 'excludeSpawnedBosses', state.excludeSpawnedBosses)
  // ---------------------------

  // - Divination Card Filters -
  filters.add(state.minDivinationCardPrice > 0, 'minDivinationCardPrice', state.minDivinationCardPrice)
  filters.add(state.minEffectiveDivinationCardValue > 0, 'minEffectiveDivinationCardValue', state.minEffectiveDivinationCardValue)
  // ---------------------------

  filters.add(hasActiveFilter(state), 'filters', JSON.stringify(state.filters))
  router.push(filters)
  filterQueryStore.SET_FILTER_QUERY(filters.query)
})
</script>

<template>
  <v-navigation-drawer
    :model-value="drawer"
    :floating="true"
    :width="400"

    class="bg-surface-variant"
    elevation="1"
    disable-resize-watcher
    :permanent="true"
  >
    <v-card color="grey-darken-3" :flat="true">
      <FilterToolbar />
      <v-card-text>
        <TextFilterHolder />
        <v-expansion-panels>
          <MapFilterHolder />
          <BossFilterHolder />
          <DivinationCardFilterHolder />
        </v-expansion-panels>
      </v-card-text>
    </v-card>
    <AtlasOverlayHolder />
  </v-navigation-drawer>
</template>
