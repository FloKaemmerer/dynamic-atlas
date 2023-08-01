<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeBaseMobCount = ref(filterStore.GET_SELECTED_FILTER().includeBaseMobCount)
const baseMobCount = ref(filterStore.GET_SELECTED_FILTER().baseMobCount)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].includeBaseMobCount !== includeBaseMobCount.value) {
    includeBaseMobCount.value = state.filters[state.currentSelectedFilterIndex].includeBaseMobCount
  }
  if (state.filters[state.currentSelectedFilterIndex].baseMobCount !== baseMobCount.value) {
    baseMobCount.value = state.filters[state.currentSelectedFilterIndex].baseMobCount
  }
})

function handleIncludeBaseMobCountFilter() {
  filterStore.GET_SELECTED_FILTER().includeBaseMobCount = !includeBaseMobCount.value
  if (filterStore.GET_SELECTED_FILTER().includeBaseMobCount && filterStore.GET_SELECTED_FILTER().baseMobCount === undefined) {
    filterStore.GET_SELECTED_FILTER().baseMobCount = [0, 10]
  }
}

function debounceBaseMobCountFilter(value: [number, number]) {
  if (filterStore.GET_SELECTED_FILTER().baseMobCount === undefined) {
    filterStore.GET_SELECTED_FILTER().baseMobCount = value
  }
  // @ts-expect-error within 'debounceBaseMobCountFilter' baseMobCount can't be undefined here
  else if (value[0] !== filterStore.GET_SELECTED_FILTER().baseMobCount[0] || value[1] !== filterStore.GET_SELECTED_FILTER().baseMobCount[1]) {
    filterStore.GET_SELECTED_FILTER().baseMobCount = value
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Base Mob Count
      <v-tooltip
        text="The Base Mob count of Monsters present in the normal version of the map."
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
        v-model="includeBaseMobCount"
        density="compact"
        @click="handleIncludeBaseMobCountFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        v-model="baseMobCount"
        :strict="true"
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="10"
        :min="1"
        :disabled="!includeBaseMobCount"
        @update:model-value="value => debounceBaseMobCountFilter(value)"
      >
        <template #prepend>
          Low
        </template>
        <template #append>
          High
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
