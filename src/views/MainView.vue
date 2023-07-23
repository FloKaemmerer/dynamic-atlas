<script setup lang="ts">

import DynamicAtlas from "@/components/DynamicAtlas.vue";
import FilterDrawer from "@/components/filter_drawer/FilterDrawer.vue";
import DetailsDrawer from "@/components/details_drawer/DetailsDrawer.vue";
import {computed} from "vue";
import {useFilterDrawerStore} from "@/store/FilterDrawerStore";

const filterDrawerStore = useFilterDrawerStore();

const drawer = computed<boolean>(() => filterDrawerStore.drawer)

function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(true)
}
</script>

<template>
  <FilterDrawer/>
  <v-app-bar density="compact" color='#282828' elevation="0">
    <v-tooltip>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-menu" color="grey-lighten-4" v-show="!drawer"
               @click.stop="toggleFilterDrawer"

               v-bind="props"></v-btn>
      </template>
      <p>Show Filters</p>
    </v-tooltip>
    <v-spacer/>
    <v-btn variant="text" color="grey-lighten-4">
      About
    </v-btn>

  </v-app-bar>
  <DetailsDrawer :drawer="false"/>
  <DynamicAtlas></DynamicAtlas>
</template>

<style scoped>

</style>