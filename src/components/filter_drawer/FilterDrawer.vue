<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import bgImage from '@/assets/images/bg.jpg'
import { initFilter } from '@/composable/filter/atlas-filter-handler'
import AtlasOverlayHolder from '@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue'
import { useFilterStore } from '@/store/FilterStore'
import type { LooseFilters } from '@/model/looseFilters'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import handleUrlQueryFilters from '@/composable/filter/url-query-filter-handler'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { getFilterName, hasActiveFilters } from '@/composable/filter/filter-utils'
import { getRandomColor } from '@/composable/random-color'
import FilterHolder from '@/components/filter_drawer/FilterHolder.vue'

const filterStore = useFilterStore()
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
    filterId: Date.now(),
    filterColor: getRandomColor(),
    filterName: getFilterName(numberOfFilters),
  })
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

  // extract active Filters from filters to push to Query
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
    <v-card color="transparent" rounded="0" :flat="true">
      <v-row no-gutters>
        <v-col cols="10">
          <v-tabs
            v-model="tab"
            align-tabs="title"
            show-arrows
          >
            <v-tab
              v-for="(item, filterIndex) in filterStore.filters"
              :key="item.filterId"
              :value="item.filterName"
              @click="filterStore.SET_CURRENT_SELECTED_FILTER_INDEX(filterIndex)"
            >
              <v-card :color="item.filterColor">
                <v-card-text>
                  <div class="h-0 w-0" />
                </v-card-text>
              </v-card>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col align-self="end" cols="2">
          <v-tooltip>
            <template #activator="{ props }">
              <v-btn
                icon="mdi-filter-plus-outline"
                v-bind="props"
                @click="addNewFilter()"
              />
            </template>
            <p>Add new Filter</p>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-window v-model="tab">
        <v-window-item
          v-for="item in filterStore.filters"
          :key="item.filterName"
          :value="item.filterName"
        >
          <FilterHolder />
        </v-window-item>
      </v-window>
    </v-card>
    <AtlasOverlayHolder />
  </v-navigation-drawer>
</template>
