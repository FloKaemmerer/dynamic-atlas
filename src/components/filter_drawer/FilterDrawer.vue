<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import bgImage from '@/assets/images/bg.jpg'
import { initFilter } from '@/composable/filter/atlas-filter-handler'
import FilterToolbar from '@/components/filter_drawer/FilterToolbar.vue'
import AtlasOverlayHolder from '@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue'
import { useFilterStore } from '@/store/FilterStore'
import type { LooseFilters } from '@/model/filter/looseFilters'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import handleUrlQueryFilters from '@/composable/filter/url-query-filter-handler'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { getFilterName, hasActiveFilters } from '@/composable/filter/filter-utils'
import { getRandomColor } from '@/composable/random-color'
import FilterHolder from '@/components/filter_drawer/FilterHolder.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const tab = ref(0)

const drawer = computed<boolean>(() => filterDrawerStore.drawer)

onBeforeMount(() => initFilter())

function addNewFilter() {
  const numberOfFilters = filterStore.filters.length
  filterStore.ADD_FILTER({
    id: Date.now(),
    color: getRandomColor(),
    name: getFilterName(numberOfFilters),
    active: true,
  })
  activeFiltersStore.ADD_ACTIVE_FILTERS({
    id: Date.now(),
    activeMapFilters: [],
    activeBossFilters: [],
    activeDivinationCardFilters: [],
  })
}

function setCurrentSelectedIndex(filterIndex: number) {
  filterStore.SET_CURRENT_SELECTED_FILTER_INDEX(filterIndex)
  activeFiltersStore.SET_CURRENT_SELECTED_ACTIVE_FILTER_INDEX(filterIndex)
}
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
  handleUrlQueryFilters(route.query)
})

filterStore.$subscribe((_mutation, state) => {
  const filters = queryFilters()

  const activeFilters = state.filters.filter(value => hasActiveFilters(value))

  tab.value = state.currentSelectedFilterIndex

  if (activeFilters.length > 0) {
    filters.add(true, 'filters', JSON.stringify(activeFilters))
  }
  router.push(filters)
  filterQueryStore.SET_FILTER_QUERY(filters.query)
})
</script>

<template>
  <v-navigation-drawer
    :model-value="drawer"
    :image="bgImage"
    :floating="true"
    :width="416"
    class="sidebar-filters"
    elevation="0"
    border="right"
    disable-resize-watcher
    :permanent="true"
  >
    <FilterToolbar />
    <v-toolbar color="gray">
      <v-tabs
        v-model="tab"
        show-arrows
        bg-color="gray"
      >
        <v-tab
          v-for="(item, filterIndex) in filterStore.filters"
          :key="item.id"
          :value="item.id"
          class="text-offwhite"
          @click="setCurrentSelectedIndex(filterIndex)"
        >
          <v-icon :color="item.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-tooltip>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-filter-plus-outline"
            class="text-offwhite"
            v-bind="props"
            @click="addNewFilter()"
          />
        </template>
        <p>Add new Filter</p>
      </v-tooltip>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item
        v-for="item in filterStore.filters"
        :key="item.id"
        :value="item.id"
      >
        <FilterHolder />
      </v-window-item>
    </v-window>
    <AtlasOverlayHolder />
  </v-navigation-drawer>
</template>
