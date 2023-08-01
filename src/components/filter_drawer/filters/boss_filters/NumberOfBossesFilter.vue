<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeNumberOfBosses = ref(filterStore.includeNumberOfBosses)
const numberOfBosses = ref(filterStore.numberOfBosses)

filterStore.$subscribe((mutation, state) => {
  if (state.includeNumberOfBosses !== includeNumberOfBosses.value) {
    includeNumberOfBosses.value = state.includeNumberOfBosses
  }
  if (state.numberOfBosses !== numberOfBosses.value) {
    numberOfBosses.value = state.numberOfBosses
  }
})

function handleIncludeNumberOfBossesFilter() {
  filterStore.SET_INCLUDE_NUMBER_OF_BOSSES(!includeNumberOfBosses.value)
}

function debounceNumberOfBossesFilter(value: [number, number]) {
  if (!(value[0] === filterStore.numberOfBosses[0] && value[1] === filterStore.numberOfBosses[1])) {
    filterStore.SET_NUMBER_OF_BOSSES(value)
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Number of Bosses
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeNumberOfBosses"
        density="compact"
        @click="handleIncludeNumberOfBossesFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="numberOfBosses"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="4"
        :min="0"
        :disabled="!includeNumberOfBosses"
        @update:model-value="value => debounceNumberOfBossesFilter(value)"
      >
        <template #prepend>
          {{ numberOfBosses[0] }}
        </template>
        <template #append>
          {{ numberOfBosses[1] }}
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
