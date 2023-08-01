<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeLinearity = ref(filterStore.GET_SELECTED_FILTER().includeLinearity)
const linearity = ref(filterStore.GET_SELECTED_FILTER().linearity)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeLinearity !== includeLinearity.value) {
    includeLinearity.value = state.filters[state.currentSelectedFilterIndex].includeLinearity
  }
  if (state.filters[state.currentSelectedFilterIndex].linearity !== linearity.value) {
    linearity.value = state.filters[state.currentSelectedFilterIndex].linearity
  }
})

function handleIncludeLinearityFilter() {
  filterStore.GET_SELECTED_FILTER().includeLinearity = !includeLinearity.value
  if (filterStore.GET_SELECTED_FILTER().includeLinearity && filterStore.GET_SELECTED_FILTER().linearity === undefined) {
    filterStore.GET_SELECTED_FILTER().linearity = [0, 10]
  }
}

function debounceLinearityFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().linearity === undefined) {
    filterStore.GET_SELECTED_FILTER().linearity = value
  }
  // @ts-expect-error within 'debounceLinearityFilter' mapTier can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().linearity[0] || value[1] !== filterStore.GET_SELECTED_FILTER().linearity[1]) {
    filterStore.GET_SELECTED_FILTER().linearity = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Linearity
      <v-tooltip
        text="High linearity is a map with a single more or less narrow Path to be followed (Alleyways, Malformation etc)"
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
        v-model="includeLinearity"
        density="compact"
        @click="handleIncludeLinearityFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="linearity"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :min="0"
        :disabled="!includeLinearity"
        @update:model-value="value => debounceLinearityFilter(value)"
      >
        <template #prepend>
          Not Linear
        </template>
        <template #append>
          Linear
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
