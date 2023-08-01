<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeBacktrackFactor = ref(filterStore.includeBacktrackFactor)

const backtrackFactor = ref(filterStore.backtrackFactor)

filterStore.$subscribe((mutation, state) => {
  if (state.includeBacktrackFactor !== includeBacktrackFactor.value) {
    includeBacktrackFactor.value = state.includeBacktrackFactor
  }
  if (state.backtrackFactor !== backtrackFactor.value) {
    backtrackFactor.value = state.backtrackFactor
  }
})

function handleIncludeBacktrackFactorFilter() {
  filterStore.SET_INCLUDE_BACKTRACK_FACTOR(!includeBacktrackFactor.value)
}

function debounceBacktrackFactorFilter(value: [number, number]) {
  if (!(value[0] === filterStore.backtrackFactor[0] && value[1] === filterStore.backtrackFactor[1])) {
    filterStore.SET_BACKTRACK_FACTOR(value)
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Backtrack Factor
      <v-tooltip
        text="A low Backtrack Factor means, that a map can be cleared without the need to Backtrack"
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
        v-model="includeBacktrackFactor"
        density="compact"
        @click="handleIncludeBacktrackFactorFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="backtrackFactor"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :min="0"
        :disabled="!includeBacktrackFactor"
        @update:model-value="value => debounceBacktrackFactorFilter(value)"
      >
        <template #prepend>
          None
        </template>
        <template #append>
          Alot
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
