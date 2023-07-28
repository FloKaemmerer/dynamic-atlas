<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { LocationQuery, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { initFilter } from '@/composable/atlas-filter-handler'
import DivinationCardFilterHolder
  from '@/components/filter_drawer/filters/divination_card_filters/DivinationCardFilterHolder.vue'
import BossFilterHolder from '@/components/filter_drawer/filters/boss_filters/BossFilterHolder.vue'
import MapFilterHolder from '@/components/filter_drawer/filters/map_filters/MapFilterHolder.vue'
import TextFilterHolder from '@/components/filter_drawer/filters/text_filters/TextFilterHolder.vue'
import AtlasOverlayHolder from '@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue'
import { useFilterStore } from '@/store/FilterStore'
import type { LooseFilters } from '@/model/looseFilters'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import handleUrlQueryFilters from '@/composable/url-query-filter-handler'
import FilterToolbar from '@/components/filter_drawer/FilterToolbar.vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'

const filterStore = useFilterStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const drawer = computed<boolean>(() => filterDrawerStore.drawer)

onMounted(() => {
  // We need to import the AtlasFilter composable, otherwise it won't trigger, even though it is subscribed to the FilterStore
  initFilter()
  handleQueryParams()
})

async function handleQueryParams() {
  await router.isReady()
  const queryParams: LocationQuery = route.query
  handleUrlQueryFilters(queryParams)
}

filterStore.$subscribe((mutation, state) => {
  const queryFilters: LooseFilters = {}
  // ----- Map Filters -----
  if (state.filterText && state.filterText.length > 0) {
    queryFilters.filterText = state.filterText
  }

  if (state.mapTier[0] >= 0 && state.includeMapTier) {
    queryFilters.mapTier = String(state.mapTier)
  }

  if (state.openness[0] >= 0 && state.includeOpenness) {
    queryFilters.openness = String(state.openness)
  }

  if (state.traversability[0] >= 0 && state.includeTraversability) {
    queryFilters.traversability = String(state.traversability)
  }

  if (state.backtrackFactor[0] >= 0 && state.includeBacktrackFactor) {
    queryFilters.backtrackFactor = String(state.backtrackFactor)
  }

  if (state.linearity[0] >= 0 && state.includeLinearity) {
    queryFilters.linearity = String(state.linearity)
  }

  if (state.terrainSlots[0] >= 0 && state.includeTerrainSlots) {
    queryFilters.terrainSlots = String(state.terrainSlots)
  }

  if (state.baseMobCount[0] >= 0 && state.includeBaseMobCount) {
    queryFilters.baseMobCount = String(state.baseMobCount)
  }

  if (state.rushableBoss) {
    queryFilters.rushableBoss = String(state.rushableBoss)
  }

  // --------------------------

  // ------ Boss Filters ------
  if (state.numberOfBosses[0] >= 0 && state.includeNumberOfBosses) {
    queryFilters.numberOfBosses = String(state.numberOfBosses)
  }

  if (state.excludePhasedBosses) {
    queryFilters.excludePhasedBosses = String(state.excludePhasedBosses)
  }

  if (state.includeSkippablePhases) {
    queryFilters.includeSkippablePhases = String(state.includeSkippablePhases)
  }

  if (state.includeSpawnIntro) {
    queryFilters.includeSpawnIntro = String(state.includeSpawnIntro)
  }

  if (state.excludeSpawnedBosses) {
    queryFilters.excludeSpawnedBosses = String(state.excludeSpawnedBosses)
  }

  // ---------------------------

  // - Divination Card Filters -
  if (state.minDivinationCardPrice > 0) {
    queryFilters.minDivinationCardPrice = state.minDivinationCardPrice
  }

  if (state.minEffectiveDivinationCardValue > 0) {
    queryFilters.minEffectiveDivinationCardValue = state.minEffectiveDivinationCardValue
  }

  // ---------------------------

  filterQueryStore.SET_FILTER_QUERY(queryFilters)
})

async function pushToRouter(queryFilters: LooseFilters) {
  await router.isReady()
  await router.push({ query: queryFilters })
}
</script>

<template>
  <v-navigation-drawer
    :model-value="drawer"
    floating
    :width="400"

    class="bg-surface-variant"
    elevation="1"
    disable-resize-watcher
    permanent
  >
    <v-card color="grey-darken-3" flat>
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
