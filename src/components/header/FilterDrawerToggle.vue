<script setup lang="ts">
import { useFilterDrawerStore } from '@/store/FilterDrawerStore'

const filterDrawerStore = useFilterDrawerStore()
function toggleFilterDrawer() {
  filterDrawerStore.SET_DRAWER(!filterDrawerStore.drawer)
}
</script>

<template>
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
</template>
