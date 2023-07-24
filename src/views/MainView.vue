<script setup lang="ts">

import DynamicAtlas from "@/components/DynamicAtlas.vue";
import FilterDrawer from "@/components/filter_drawer/FilterDrawer.vue";
import DetailsDrawer from "@/components/details_drawer/DetailsDrawer.vue";
import {useFilterDrawerStore} from "@/store/FilterDrawerStore";

const filterDrawerStore = useFilterDrawerStore();

function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(!filterDrawerStore.drawer)
}

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer');
}
</script>

<template>
  <FilterDrawer/>
  <v-app-bar density="compact" color='#282828' elevation="0">
    <v-tooltip>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-menu" color="grey-lighten-4"
               @click.stop="toggleFilterDrawer"

               v-bind="props"></v-btn>
      </template>
      <p>Toggle Filters</p>
    </v-tooltip>
    <v-spacer/>
    <v-btn variant="text" color="grey-lighten-4" role="link"
           @click="openInNewTab('https://poeAtlas.app/atlasNodes.json')">
      Raw Data
    </v-btn>
    |
    <v-btn variant="text" color="grey-lighten-4" role="link"
           @click="openInNewTab('https://github.com/FloKaemmerer/dynamic-atlas')">
      Github
    </v-btn>
  </v-app-bar>
  <DetailsDrawer :drawer="false"/>
  <DynamicAtlas></DynamicAtlas>
</template>

<style scoped>

</style>