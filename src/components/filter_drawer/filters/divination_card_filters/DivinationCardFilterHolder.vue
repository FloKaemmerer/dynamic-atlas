<script setup lang="ts">
import { ref } from 'vue'
import MinimumDivinationCardPriceFilter
  from '@/components/filter_drawer/filters/divination_card_filters/MinimumDivinationCardPriceFilter.vue'
import MinimumEffectiveCardValueFilter
  from '@/components/filter_drawer/filters/divination_card_filters/MinimumEffectiveCardValueFilter.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterStore } from '@/store/FilterStore'

const activeFiltersStore = useActiveFiltersStore()
const filterStore = useFilterStore()

const activeDivinationCardFilters = ref(activeFiltersStore.activeDivinationCardFilters.length)
const panel = ref()

activeFiltersStore.$subscribe((mutation, state) => {
  if (state.activeDivinationCardFilters.length !== activeDivinationCardFilters.value) {
    activeDivinationCardFilters.value = state.activeDivinationCardFilters.length
  }
})

function clearActiveDivinationCardFilters() {
  filterStore.CLEAR_DIVINATION_CARD_FILTERS()
  panel.value = []
  setTimeout(() => {
    panel.value = []
  }, 10)
}
</script>

<template>
  <v-expansion-panel value="DivinationCardPanel">
    <v-expansion-panel-title>
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          <p class="text-subtitle-1">
            Divination Card Filters
          </p>
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="activeDivinationCardFilters > 0" class="d-inline-flex align-center justify-end text-overline pr-2" cols="5">
            Active: {{ activeDivinationCardFilters }}
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  icon="mdi-close-circle"
                  density="compact"
                  size="x-small"
                  v-bind="props"
                  class="ml-2"
                  variant="text"
                  :disabled="activeDivinationCardFilters < 1"
                  @click="clearActiveDivinationCardFilters()"
                />
              </template>
              <p>Clear Active Divination Card Filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <MinimumDivinationCardPriceFilter />
      <MinimumEffectiveCardValueFilter />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
