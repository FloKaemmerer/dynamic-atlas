<script setup lang="ts">
import buildShareableUrl from "@/composable/shareable-url-builder";
import copyToClipBoard from "@/composable/copy-utils";
import {useFilterQueryStore} from "@/store/FilterQueryStore";
import {useFilterStore} from "@/store/FilterStore";
import {useActiveFiltersStore} from "@/store/activeFiltersStore";
import {useFilterDrawerStore} from "@/store/FilterDrawerStore";

const filterQueryStore = useFilterQueryStore();
const filterStore = useFilterStore();
const activeFiltersStore = useActiveFiltersStore();
const filterDrawerStore = useFilterDrawerStore();

function clearAllFilters() {
  filterStore.$reset()
  activeFiltersStore.$reset()
}

function copyShareableLinkToClipboard() {
  const queryParams = filterQueryStore.filterQuery;

  const shareableUrl = buildShareableUrl(queryParams);
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
    <template v-slot:append>
      <v-tooltip>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-content-copy" @click="copyShareableLinkToClipboard()"
                 v-bind="props"></v-btn>
        </template>
        <p>Copy Shareable Link to Clipboard</p>
      </v-tooltip>

      <v-tooltip>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-close-circle" @click="clearAllFilters()"
                 v-bind="props"></v-btn>
        </template>
        <p>Clear all Filters</p>
      </v-tooltip>

      <v-tooltip>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-chevron-left" @click="toggleFilterDrawer()"
                 v-bind="props"></v-btn>
        </template>
        <p>Hide Filter</p>
      </v-tooltip>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>