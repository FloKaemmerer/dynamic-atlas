<script setup lang="ts">
import { computed } from 'vue'
import MinimumDivinationCardPriceFilter
  from '@/components/filter_drawer/filters/divination_card_filters/MinimumDivinationCardPriceFilter.vue'
import MinimumEffectiveCardValueFilter
  from '@/components/filter_drawer/filters/divination_card_filters/MinimumEffectiveCardValueFilter.vue'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'
import { useFilterStore } from '@/store/FilterStore'

const activeFiltersStore = useActiveFiltersStore()
const filterStore = useFilterStore()

const divinationCardFiltersCount = computed(() => activeFiltersStore.activeDivinationCardFilters.length)
</script>

<template>
  <v-expansion-panel bg-color="black" color="amber-lighten-5" value="DivinationCardPanel">
    <v-expansion-panel-title class="text-subtitle-1 ">
      <v-row no-gutters>
        <v-col class="d-inline-flex align-center" cols="7">
          Divination Card Filters
        </v-col>
        <v-fade-transition leave-absolute>
          <v-col v-if="divinationCardFiltersCount > 0" class="d-inline-flex align-center justify-end text-overline pr-2" cols="5">
            Active: {{ divinationCardFiltersCount }}
            <v-tooltip>
              <template #activator="{ props }">
                <v-btn
                  icon="mdi-close-circle"
                  density="compact"
                  size="x-small"
                  v-bind="props"
                  class="ml-2"
                  variant="text"
                  :disabled="divinationCardFiltersCount < 1"
                  @click="filterStore.CLEAR_DIVINATION_CARD_FILTERS()"
                />
              </template>
              <p>Clear Active Divination Card Filters</p>
            </v-tooltip>
          </v-col>
        </v-fade-transition>
      </v-row>
      <template #actions="{ expanded }">
        <v-icon :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'" />
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <MinimumDivinationCardPriceFilter />
      <MinimumEffectiveCardValueFilter />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style scoped>

</style>
