<script setup lang="ts">
import copyToClipBoard from '@/composable/copy-utils'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

function copyFilterPresetToClipboard() {
  copyToClipBoard(JSON.stringify(filterStore.selectedFilter))
}
</script>

<template>
  <v-toolbar density="compact">
    <v-toolbar-title class="text-h6">
      <v-icon :color="filterStore.selectedFilter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
      {{ filterStore.GET_SELECTED_FILTER().name }}
    </v-toolbar-title>
    <template #append>
      <v-spacer />
      <v-tooltip>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-content-copy" class="text-offwhite"
            v-bind="props"
            @click="copyFilterPresetToClipboard()"
          />
        </template>
        <p>Share Selected Filter</p>
      </v-tooltip>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>
