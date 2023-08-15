<script setup lang="ts">
import { ref } from 'vue'
import { getNumberOfActiveFilters } from '@/composable/filter/filter-utils'
import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import FilterSharingOverlay from '@/components/overlays/FilterSharingOverlay.vue'
import MainFilterMenu from '@/components/header/MainFilterMenu.vue'
import FilterDrawerToggle from '@/components/header/FilterDrawerToggle.vue'
import ColorPickerOverlay from '@/components/overlays/ColorPickerOverlay.vue'

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const selectedTab = ref(0)

const selectedFilterId = ref(filterStore.selectedFilter.id)
const showColorPickerOverlay = ref(false)
const showFilterShareOverly = ref(false)

function toggleColorPickerOverlay(filterId: number) {
  selectedFilterId.value = filterId
  showColorPickerOverlay.value = !showColorPickerOverlay.value
}

function deleteFilter(filterId: number) {
  filterStore.filtersMap.delete(filterId)
  filterStore.selectedFilter = filterStore.filtersMap.values().next().value
}
function clearAllFiltersFromFilter(filterId: number) {
  filterStore.CLEAR_FILTER(filterId)
  activeFiltersStore.CLEAR_ACTIVE_FILTERS(filterId)
}

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer')
}
</script>

<template>
  <v-app-bar density="compact" color="#282828" elevation="0">
    <FilterDrawerToggle />
    <MainFilterMenu @update:selected-tab="value => selectedTab = value" />
    <v-tabs
      v-model="selectedTab"
      show-arrows
      bg-color="gray"
    >
      <v-tab
        v-for="[id, filter] in filterStore.filtersMap"
        :key="id"
        :value="id"
        class="text-offwhite"
        @click="filterStore.selectedFilter = filter"
      >
        <v-tooltip>
          <template #activator="{ props }">
            <v-icon
              v-if="filter.active"
              icon="mdi-eye-outline"
              class="text-offwhite"
              v-bind="props"
              @click="filter.active = !filter.active"
            />
            <v-icon
              v-else
              variant="text"
              icon="mdi-eye-off-outline"
              class="text-offwhite"
              v-bind="props"
              @click="filter.active = !filter.active"
            />
          </template>
          <p>Show/Hide Filter</p>
        </v-tooltip>
        <span class="mx-2">
          <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
          {{ filter.name }}
          {{ getNumberOfActiveFilters(id) }}
        </span>
        <v-menu>
          <template #activator="{ props }">
            <v-icon
              color="primary"
              size="small"
              v-bind="props"
              variant="text"
              icon="mdi-cog"
              class="text-offwhite"
            />
          </template>
          <v-list>
            <v-list-item>
              <v-tooltip>
                <template #activator="{ props }">
                  <v-btn
                    variant="text"
                    size="small"
                    icon="mdi-close-circle"
                    v-bind="props"
                    class="text-offwhite"
                    @click="clearAllFiltersFromFilter(id)"
                  />
                </template>
                <p>Clear Filter</p>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <v-tooltip>
                <template #activator="{ props }">
                  <v-btn
                    variant="text"
                    size="small"
                    class="text-offwhite"
                    icon="mdi-pencil-outline"
                    v-bind="props"
                    @click="toggleColorPickerOverlay(id)"
                  />
                </template>
                <p>Edit Filter Settings</p>
              </v-tooltip>
            </v-list-item>

            <v-list-item>
              <v-tooltip>
                <template #activator="{ props }">
                  <v-btn
                    variant="text"
                    size="small"
                    class="text-offwhite"
                    icon="mdi-trash-can-outline"
                    v-bind="props"
                    :disabled="filterStore.filtersMap.size <= 1" @click="deleteFilter(id)"
                  />
                </template>
                <p>Delete Filter</p>
              </v-tooltip>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>
    <v-spacer />
    <v-tooltip>
      <template #activator="{ props }">
        <v-btn
          variant="text"
          icon="mdi-share-variant-outline"
          v-bind="props"
          @click="showFilterShareOverly = !showFilterShareOverly"
        />
      </template>
      <p>Share Filters</p>
    </v-tooltip>
    |
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
  <ColorPickerOverlay v-model:toggle="showColorPickerOverlay" v-model:filter-id="selectedFilterId" />
  <FilterSharingOverlay v-model:toggle="showFilterShareOverly" />
</template>
