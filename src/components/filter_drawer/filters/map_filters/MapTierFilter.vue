<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()

const includeMapTier = ref(filterStore.includeMapTier)
const mapTier = ref(filterStore.mapTier)

filterStore.$subscribe((mutation, state) => {
  if (state.includeMapTier !== includeMapTier.value) {
    includeMapTier.value = state.includeMapTier
  }
  if (state.mapTier !== mapTier.value) {
    mapTier.value = state.mapTier
  }
})

function handleIncludeMapTierFilter() {
  filterStore.SET_INCLUDE_MAP_TIER(!includeMapTier.value)
}

function debounceMapTierFilter(value: [number, number]) {
  if (!(value[0] === filterStore.mapTier[0] && value[1] === filterStore.mapTier[1])) {
    filterStore.SET_MAP_TIER(value)
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      Map Tier
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1">
      <v-checkbox
        v-model="includeMapTier"
        density="compact"
        @click="handleIncludeMapTierFilter()"
      />
    </v-col>
    <v-col>
      <v-range-slider
        id="mapTierFilter"
        v-model="mapTier"
        strict
        direction="horizontal"
        step="1"
        show-ticks="always"
        tick-size="4"
        thumb-label
        :max="16"
        :min="1"
        :disabled="!includeMapTier"
        @update:model-value="value => debounceMapTierFilter(value)"
      >
        <template #prepend>
          {{ mapTier[0] }}
        </template>
        <template #append>
          {{ mapTier[1] }}
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
