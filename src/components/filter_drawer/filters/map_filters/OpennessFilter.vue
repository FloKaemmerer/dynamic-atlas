<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeOpenness = ref(filterStore.GET_SELECTED_FILTER().includeOpenness)
const openness = ref(filterStore.GET_SELECTED_FILTER().openness)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeOpenness !== includeOpenness.value) {
    includeOpenness.value = state.filters[state.currentSelectedFilterIndex].includeOpenness
  }
  if (state.filters[state.currentSelectedFilterIndex].openness !== openness.value) {
    openness.value = state.filters[state.currentSelectedFilterIndex].openness
  }
})

function handleIncludeOpennessFilter() {
  filterStore.GET_SELECTED_FILTER().includeOpenness = !includeOpenness.value
  if (filterStore.GET_SELECTED_FILTER().includeOpenness && filterStore.GET_SELECTED_FILTER().openness === undefined) {
    filterStore.GET_SELECTED_FILTER().openness = [0, 10]
  }
}

function debounceOpennessFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().openness === undefined) {
    filterStore.GET_SELECTED_FILTER().openness = value
  }
  // @ts-expect-error within 'debounceOpennessFilter' openness can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().openness[0] || value[1] !== filterStore.GET_SELECTED_FILTER().openness[1]) {
    filterStore.GET_SELECTED_FILTER().openness = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Openness
      <v-tooltip
        text="Openness = Narrow = Toxic Sewers; Openness = Open = Dunes"
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
        v-model="includeOpenness"
        density="compact"
        @click="handleIncludeOpennessFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="openness"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :disabled="!includeOpenness"
        @update:model-value="value => debounceOpennessFilter(value)"
      >
        <template #prepend>
          Narrow
        </template>
        <template #append>
          Open
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
