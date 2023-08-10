<script setup lang="ts">
import { ref } from 'vue'
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'
import { useFilterStore } from '@/store/FilterStore'

const filterDrawerStore = useFilterDrawerStore()
const filterStore = useFilterStore()
const tab = ref(0)

const showOverlay = ref(false)
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
    <v-tabs
      v-model="tab"
      show-arrows
      bg-color="gray"
    >
      <v-tab
        v-for="(item) in filterStore.filters"
        :key="item.filterId"
        :value="item.filterId"
        class="text-offwhite"
      >
        <v-icon :color="item.filterColor" class="mr-1" icon="mdi-checkbox-blank-circle" />
        {{ item.filterName }}
        <!--        <v-icon -->
        <!--          icon="mdi-pencil-outline" -->
        <!--          @click="showOverlay = !showOverlay" -->
        <!--        /> -->
        <v-icon v-if="item.filterActive" icon="mdi-eye-outline" @click="item.filterActive = !item.filterActive" />
        <v-icon v-else icon="mdi-eye-off-outline" @click="item.filterActive = !item.filterActive" />
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
<!--  <ColorPickerOverlay v-model:toggle="showOverlay" /> -->
</template>
