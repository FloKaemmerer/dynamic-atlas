<script setup lang="ts">
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'

const filterDrawerStore = useFilterDrawerStore()

function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(!filterDrawerStore.drawer)
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
</template>
