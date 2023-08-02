<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { initFilter } from '@/composable/filter/atlas-filter-handler'
import AtlasOverlayHolder from '@/components/filter_drawer/overlays/atlas_overlays/overlayHolder.vue'
import { useFilterStore } from '@/store/FilterStore'
import type { LooseFilters } from '@/model/looseFilters'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import handleUrlQueryFilters from '@/composable/filter/url-query-filter-handler'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { hasActiveFilters } from '@/composable/filter/filter-utils'
import FilterHolder from '@/components/filter_drawer/FilterHolder.vue'

const filterStore = useFilterStore()
const filterQueryStore = useFilterQueryStore()
const filterDrawerStore = useFilterDrawerStore()
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()

const tab = ref()

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

  const activeFilters = state.filters.filter(value => hasActiveFilters(value))

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
    :floating="true"
    :width="400"

    class="bg-surface-variant"
    elevation="1"
    disable-resize-watcher
    :permanent="true"
  >
    <v-card color="grey-darken-3" :flat="true">
      <v-row>
        <v-tabs
          v-model="tab"
          align-tabs="title"
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tab
            v-for="item in filterStore.filters"
            :key="item.filterName"
            :value="item.filterName"
          >
            {{ item.filterName }}
          </v-tab>
        </v-tabs>
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
