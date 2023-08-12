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
import { hasActiveFilters } from '@/composable/filter/filter-utils'
import FilterHolder from '@/components/filter_drawer/FilterHolder.vue'
import type { Filter } from '@/model/filter/filter'

const filterStore = useFilterStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const selectedFilter = ref(filterStore.selectedFilter)
const drawer = computed<boolean>(() => filterDrawerStore.drawer)

onBeforeMount(() => initFilter())

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
    <v-window v-model="selectedFilter">
      <v-window-item>
        <FilterHolder />
      </v-window-item>
    </v-window>
    <AtlasOverlayHolder />
  </v-navigation-drawer>
</template>
