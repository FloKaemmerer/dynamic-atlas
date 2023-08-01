<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeTraversability = ref(filterStore.GET_SELECTED_FILTER().includeTraversability)
const traversability = ref(filterStore.GET_SELECTED_FILTER().traversability)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeTraversability !== includeTraversability.value) {
    includeTraversability.value = state.filters[state.currentSelectedFilterIndex].includeTraversability
  }
  if (state.filters[state.currentSelectedFilterIndex].traversability !== traversability.value) {
    traversability.value = state.filters[state.currentSelectedFilterIndex].traversability
  }
})

function handleIncludeTraversabilityFilter() {
  filterStore.GET_SELECTED_FILTER().includeTraversability = !includeTraversability.value
  if (filterStore.GET_SELECTED_FILTER().includeTraversability && filterStore.GET_SELECTED_FILTER().traversability === undefined) {
    filterStore.GET_SELECTED_FILTER().traversability = [0, 10]
  }
}

function debounceTraversabilityFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().traversability === undefined) {
    filterStore.GET_SELECTED_FILTER().traversability = value
  }
  // @ts-expect-error within 'debounceTraversabilityFilter' mapTier can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().traversability[0] || value[1] !== filterStore.GET_SELECTED_FILTER().traversability[1]) {
    filterStore.GET_SELECTED_FILTER().traversability = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Traversability
      <v-tooltip
        text="Traversability is the Factor how easy it is to travers the map using a Skill like Shield Charge"
      >
        <template #activator="{ props }">
          <v-icon icon="mdi-information-outline" v-bind="props" />
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeTraversability"
        density="compact"
        @click="handleIncludeTraversabilityFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="traversability"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :disabled="!includeTraversability"
        @update:model-value="value => debounceTraversabilityFilter(value)"
      >
        <template #prepend>
          Annoying
        </template>
        <template #append>
          Easy
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
