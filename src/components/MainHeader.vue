<script setup lang="ts">
import { ref } from 'vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'

const filterDrawerStore = useFilterDrawerStore()
const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const tab = ref(0)

const showOverlay = ref(false)
const selectedFilterId = ref(filterStore.selectedFilter.id)
function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(!filterDrawerStore.drawer)
}

function toggleOverlay(filterId: number) {
  selectedFilterId.value = filterId
  showOverlay.value = !showOverlay.value
}

function deleteFilter(filterId: number) {
  filterStore.filtersMap.delete(filterId)
  filterStore.selectedFilter = filterStore.filtersMap.values().next().value
}
function clearAllFiltersFromFilter(filterId: number) {
  filterStore.CLEAR_FILTER(filterId)
  activeFiltersStore.CLEAR_ACTIVE_FILTERS(filterId)
}
function getNumberOfActiveFilters(filterId: number) {
  const activeFilters = activeFiltersStore.activeFiltersMap.get(filterId)
  if (activeFilters) {
    const numberOfActiveFilters = activeFilters.activeMapFilters.length + activeFilters.activeBossFilters.length + activeFilters.activeDivinationCardFilters.length + activeFilters.activeTextFilters.length
    if (numberOfActiveFilters > 0) {
      return numberOfActiveFilters
    }
  }
  return ''
}

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer')
}
</script>

<template>
  <v-app-bar density="compact" color="#282828" elevation="0">
    <v-tooltip>
      <template #activator="{ props }">
        <v-btn
          icon="mdi-menu" color="grey-lighten-4"
          v-bind="props"

          @click.stop="toggleFilterDrawer"
        />
      </template>
      <p>Toggle Filters</p>
    </v-tooltip>
    <v-tabs
      v-model="tab"
      show-arrows
      bg-color="gray"
    >
      <v-tab
        v-for="[id, filter] in filterStore.filtersMap"
        :key="id"
        :value="filter.name"
        class="text-offwhite"
        @click="filterStore.selectedFilter = filter"
      >
        <v-btn variant="text">
          <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
          {{ filter.name }}
          {{ getNumberOfActiveFilters(id) }}
        </v-btn>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              variant="text"
              icon="mdi-cog"
            />
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                v-if="filter.active"
                variant="text"
                icon="mdi-eye-outline" @click="filter.active = !filter.active"
              />
              <v-btn
                v-else
                variant="text" icon="mdi-eye-off-outline" @click="filter.active = !filter.active"
              />
            </v-list-item>
            <v-list-item>
              <v-btn variant="text" icon="mdi-close-circle" @click="clearAllFiltersFromFilter(id)" />
            </v-list-item>

            <v-list-item>
              <v-btn
                variant="text" icon="mdi-pencil-outline"
                @click="toggleOverlay(id)"
              />
            </v-list-item>

            <v-list-item>
              <v-btn variant="text" class="text-offwhite" icon="mdi-trash-can-outline" :disabled="filterStore.filtersMap.size <= 1" @click="deleteFilter(id)" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>
    <v-spacer />
    <v-btn
      variant="text" color="grey-lighten-4" role="link"
      @click="openInNewTab('https://poeAtlas.app/atlasNodes.json')"
    >
      Raw Data
    </v-btn>
    |
    <v-btn
      variant="text" color="grey-lighten-4" role="link"
      @click="openInNewTab('https://github.com/FloKaemmerer/dynamic-atlas')"
    >
      Github
    </v-btn>
  </v-app-bar>
  <ColorPickerOverlay v-model:toggle="showOverlay" v-model:filter-id="selectedFilterId" />
</template>
