<script setup lang="ts">
import buildShareableUrl from '@/composable/shareable-url-builder'
import copyToClipBoard from '@/composable/copy-utils'
import { useFilterQueryStore } from '@/store/FilterQueryStore'
import { useFilterStore } from '@/store/FilterStore'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'

const filterQueryStore = useFilterQueryStore()
const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const filterDrawerStore = useFilterDrawerStore()

function clearAllFilters() {
  filterStore.$reset()
  activeFiltersStore.$reset()
}

function copyShareableLinkToClipboard() {
  const queryParams = filterQueryStore.filterQuery

  const shareableUrl = buildShareableUrl(queryParams)
  copyToClipBoard(shareableUrl)
}

function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(false)
}
</script>

<template>
  <v-toolbar density="compact">
    <v-toolbar-title class="text-h6">
      Filters
    </v-toolbar-title>
    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn rounded="0" v-bind="props" size="small" icon="mdi-cog" />
        </template>
        <v-list
          density="compact"
          rounded="0"
          bg-color="grey-darken-4"
        >
          <v-list-item
            key="cog-item-1"
            value="copy"
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
            value="clear"
            @click="clearAllFilters()"
          >
            <template #prepend>
              <v-icon icon="mdi-close-circle" />
            </template>
            <v-list-item-action>
              Clear
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip>
        <template #activator="{ props }">
          <v-btn
            rounded="0"
            icon="mdi-chevron-left"
            v-bind="props"
            @click="toggleFilterDrawer()"
          />
        </template>
        <p>Hide Filters</p>
      </v-tooltip>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
