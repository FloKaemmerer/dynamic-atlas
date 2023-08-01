<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeLinearity = ref(filterStore.includeLinearity)
const linearity = ref(filterStore.linearity)

filterStore.$subscribe((mutation, state) => {
  if (state.includeLinearity !== includeLinearity.value) {
    includeLinearity.value = state.includeLinearity
  }
  if (state.linearity !== linearity.value) {
    linearity.value = state.linearity
  }
})

function handleIncludeLinearityFilter() {
  filterStore.SET_INCLUDE_LINEARITY(!includeLinearity.value)
}

function debounceLinearityFilter(value: [number, number]) {
  if (!(value[0] === filterStore.linearity[0] && value[1] === filterStore.linearity[1])) {
    filterStore.SET_LINEARITY(value)
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
