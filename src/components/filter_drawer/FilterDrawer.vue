<template>
  <v-navigation-drawer
      :model-value="drawer"
      floating:true
      :width="400"
      class="bg-surface-variant mb-6"
      elevation="1"
      disable-resize-watcher:true
      permanent:true>
    <v-row no-gutters>
      <v-col cols="12">
        <FilterToolbar/>
        <TextFilterHolder/>

        <MapFilterHolder/>
        <BossFilterHolder/>
        <DivinationCardFilterHolder/>
        <AtlasOverlayHolder/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn variant="text" @click="toggleAboutOverlay = !toggleAboutOverlay">
          About
        </v-btn>
        |
        <v-btn variant="text" @click="toggleImproveOverlay = !toggleImproveOverlay">
          Improve
        </v-btn>
        |
        <v-btn variant="text" @click="toggleContactOverlay = !toggleContactOverlay">
          Contact
        </v-btn>
        |
        <v-btn variant="text" @click="toggleGlossaryOverlay = !toggleGlossaryOverlay">
          Glossary
        </v-btn>
        |
        <v-btn variant="text" @click="toggleChangelogOverlay = !toggleChangelogOverlay">
          Changelog
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        © 2023 PoeAtlas.app. All Rights Reserved.
      </v-col>
    </v-row>
  </v-navigation-drawer>
  <AboutOverlay :toggleOverlay="toggleAboutOverlay"></AboutOverlay>
  <ImproveOverlay :toggleOverlay="toggleImproveOverlay"></ImproveOverlay>
  <ContactOverlay :toggleOverlay="toggleContactOverlay"></ContactOverlay>
  <GlossaryOverlay :toggle-overlay="toggleGlossaryOverlay"></GlossaryOverlay>
  <ChangelogOverlay :toggle-overlay="toggleChangelogOverlay"></ChangelogOverlay>

</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {initFilter} from "@/composable/atlas-filter-handler";
import DivinationCardFilterHolder
  from "@/components/filter_drawer/filters/divination_card_filters/DivinationCardFilterHolder.vue";
import BossFilterHolder from "@/components/filter_drawer/filters/boss_filters/BossFilterHolder.vue";
import MapFilterHolder from "@/components/filter_drawer/filters/map_filters/MapFilterHolder.vue";
import TextFilterHolder from "@/components/filter_drawer/filters/text_filters/TextFilterHolder.vue";
import AtlasOverlayHolder from "@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue";
import AboutOverlay from "@/components/filter_drawer/overlays/AboutOverlay.vue";
import ImproveOverlay from "@/components/filter_drawer/overlays/ImproveOverlay.vue";
import ContactOverlay from "@/components/filter_drawer/overlays/ContactOverlay.vue";
import GlossaryOverlay from "@/components/filter_drawer/overlays/GlossaryOverlay.vue";
import ChangelogOverlay from "@/components/filter_drawer/overlays/ChangelogOverlay.vue";
import type {LocationQuery, RouteLocationNormalizedLoaded, Router} from "vue-router";
import {useRoute, useRouter} from "vue-router";
import {useFilterStore} from "@/store/FilterStore";
import type {LooseFilters} from "@/model/looseFilters";
import {useFilterQueryStore} from "@/store/FilterQueryStore";
import handleUrlQueryFilters from "@/composable/url-query-filter-handler";
import FilterToolbar from "@/components/filter_drawer/FilterToolbar.vue";
import {useFilterDrawerStore} from "@/store/FilterDrawerStore";

let toggleAboutOverlay = ref(false)
let toggleImproveOverlay = ref(false)
let toggleContactOverlay = ref(false)
let toggleGlossaryOverlay = ref(false)
let toggleChangelogOverlay = ref(false)

const filterStore = useFilterStore();
const filterQueryStore = useFilterQueryStore();
const filterDrawerStore = useFilterDrawerStore();
const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();

const drawer = computed<boolean>(() => filterDrawerStore.drawer)

onMounted(() => {
  // We need to import the AtlasFilter composable, otherwise it won't trigger, even though it is subscribed to the FilterStore
  initFilter()
  handleQueryParams()
})

async function handleQueryParams() {
  await router.isReady();
  const queryParams: LocationQuery = route.query;
  handleUrlQueryFilters(queryParams)
}

filterStore.$subscribe((mutation, state) => {
  let queryFilters: LooseFilters = {}
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
  //--------------------------

  //------ Boss Filters ------
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
  //---------------------------

  //- Divination Card Filters -
  if (state.minDivinationCardPrice > 0) {
    queryFilters.minDivinationCardPrice = state.minDivinationCardPrice
  }
  if (state.minEffectiveDivinationCardValue > 0) {
    queryFilters.minEffectiveDivinationCardValue = state.minEffectiveDivinationCardValue
  }
  //---------------------------

  filterQueryStore.SET_FILTER_QUERY(queryFilters)

  pushToRouter(queryFilters).then(() => {
    console.log(route.query)
  })
})

async function pushToRouter(queryFilters: LooseFilters) {
  await router.isReady();
  await router.push({query: queryFilters})
}
</script>