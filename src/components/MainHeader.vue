<script setup lang="ts">
import { ref } from 'vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import buildShareableUrl from '@/composable/filter/shareable-url-builder'
import copyToClipBoard from '@/composable/copy-utils'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import { getRandomColor } from '@/composable/random-color'
import { getFilterName } from '@/composable/filter/filter-utils'

const filterDrawerStore = useFilterDrawerStore()
const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const filterQueryStore = useFilterQueryStore()
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

function copyShareableLinkToClipboard() {
  const queryParams = filterQueryStore.filterQuery

  const shareableUrl = buildShareableUrl(queryParams)
  copyToClipBoard(shareableUrl)
}

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
    activeTextFilters: [],
    activeBossFilters: [],
    activeDivinationCardFilters: [],
  })
  filterStore.selectedFilter = filter
  tab.value = filterStore.filtersMap.size - 1
}

function addPresetFilter() {
  // TODO
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
          v-if="filterDrawerStore.drawer"
          icon="mdi-chevron-left" color="grey-lighten-4"
          v-bind="props"

          @click.stop="toggleFilterDrawer"
        />
        <v-btn
          v-else
          icon="mdi-chevron-right" color="grey-lighten-4"
          v-bind="props"

          @click.stop="toggleFilterDrawer"
        />
      </template>
      <p>Toggle Filter</p>
    </v-tooltip>
    <v-menu>
      <template #activator="{ props }">
        <v-btn rounded="0" v-bind="props" size="small" icon="mdi-menu" />
      </template>
      <v-list
        density="compact"
        rounded="0"
        bg-color="grey-darken-4"
      >
        <v-list-item
          key="cog-item-1"
          value="copy"
          class="text-offwhite"
          @click="copyShareableLinkToClipboard()"
        >
          <template #prepend>
            <v-icon icon="mdi-content-copy" />
          </template>
          <v-list-item-action>
            Share
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          key="cog-item-2"
          value="addNew"
          class="text-offwhite"
          @click="addNewFilter()"
        >
          <template #prepend>
            <v-icon icon="mdi-filter-plus-outline" />
          </template>
          <v-list-item-action>
            Add New
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          key="cog-item-2"
          value="addPreset"
          class="text-offwhite"
          @click="addPresetFilter()"
        >
          <template #prepend>
            <v-icon icon="mdi-calendar-filter-outline" class="text-offwhite" />
          </template>
          <v-list-item-action>
            Add Preset
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
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
