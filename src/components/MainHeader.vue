<script setup lang="ts">
import { ref } from 'vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'

const filterDrawerStore = useFilterDrawerStore()
const filterStore = useFilterStore()
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
      >
        <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
        {{ filter.name }}
        <v-icon
          icon="mdi-pencil-outline"
          @click="toggleOverlay(filter.id)"
        />
        <v-icon v-if="filter.active" icon="mdi-eye-outline" @click="filter.active = !filter.active" />
        <v-icon v-else icon="mdi-eye-off-outline" @click="filter.active = !filter.active" />
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
