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
import type { Filter } from '@/model/filter/filter'

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const selectedFilter = ref(filterStore.selectedFilter)
const drawer = computed<boolean>(() => filterDrawerStore.drawer)

onBeforeMount(() => initFilter())

function addNewFilter() {
  const numberOfFilters = filterStore.filtersMap.size
  const filter = {
    id: Date.now(),
    color: getRandomColor(),
    name: getFilterName(numberOfFilters),
    active: true,
  }
  filterStore.filtersMap.set(filter.id, filter)
  activeFiltersStore.ADD_ACTIVE_FILTERS({
    id: filter.id,
    activeMapFilters: [],
    activeBossFilters: [],
    activeDivinationCardFilters: [],
  })
  filterStore.selectedFilter = filter
}

function addPresetFilter() {

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

function deleteFilter(filterId: number) {
  filterStore.filtersMap.delete(filterId)
  filterStore.selectedFilter = filterStore.filtersMap.values().next().value
}

router.isReady().then(() => {
  handleUrlQueryFilters(route.query)
})

filterStore.$subscribe((_mutation, state) => {
  const filters = queryFilters()

  const activeFilters: Filter[] = []
  state.filtersMap.forEach((value) => {
    if (hasActiveFilters(value)) {
      activeFilters.push(value)
    }
  })

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
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            Select Filter
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="[id, filter] in filterStore.filtersMap"
            :key="id"
            :value="filter.name"
          >
            <v-list-item-title>
              <v-btn variant="text">
                <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
                {{ filter.name }}
              </v-btn>
              <v-btn variant="text" class="text-offwhite" icon="mdi-trash-can-outline" :disabled="filterStore.filtersMap.size <= 1" @click="deleteFilter(id)" />
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-btn @click="addNewFilter()">
              <v-icon
                icon="mdi-filter-plus-outline"
                class="text-offwhite"
              />
              Add new Filter
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn @click="addPresetFilter()">
              <v-icon
                icon="mdi-filter-plus-outline"
                class="text-offwhite"
              />
              Add preset Filter
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-window v-model="selectedFilter">
      <v-window-item>
        <FilterHolder />
      </v-window-item>
    </v-window>
    <AtlasOverlayHolder />
  </v-navigation-drawer>
</template>
