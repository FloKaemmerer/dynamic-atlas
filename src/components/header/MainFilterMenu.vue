<script setup lang="ts">
import { ref } from 'vue'
import { buildShareableUrl } from '@/composable/filter/shareable-url-builder'
import copyToClipBoard from '@/composable/copy-utils'
import { getRandomColor } from '@/composable/random-color'
import { getFilterName } from '@/composable/filter/filter-utils'
import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import FilterPresetImportOverlay from '@/components/overlays/FilterPresetImportOverlay.vue'

const emit = defineEmits(['update:selectedTab'])
const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const filterQueryStore = useFilterQueryStore()

const showFilterPresetImportOverly = ref(false)

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
  emit('update:selectedTab', filterStore.filtersMap.size - 1)
}

function addPresetFilter() {
  showFilterPresetImportOverly.value = !showFilterPresetImportOverly.value
}
</script>

<template>
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
  <FilterPresetImportOverlay v-model:toggle="showFilterPresetImportOverly" />
</template>
