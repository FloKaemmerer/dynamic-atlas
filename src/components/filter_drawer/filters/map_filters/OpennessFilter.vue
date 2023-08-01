<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeOpenness = ref(filterStore.includeOpenness)
const openness = ref(filterStore.openness)

filterStore.$subscribe((mutation, state) => {
  if (state.includeOpenness !== includeOpenness.value) {
    includeOpenness.value = state.includeOpenness
  }
  if (state.openness !== openness.value) {
    openness.value = state.openness
  }
})

function handleIncludeOpennessFilter() {
  filterStore.SET_INCLUDE_OPENNESS(!includeOpenness.value)
}

function debounceOpennessFilter(value: [number, number]) {
  if (!(value[0] === filterStore.openness[0] && value[1] === filterStore.openness[1])) {
    filterStore.SET_OPENNESS(value)
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
