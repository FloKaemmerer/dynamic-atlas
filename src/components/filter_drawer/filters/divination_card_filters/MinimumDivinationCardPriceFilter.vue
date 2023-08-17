<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const minDivinationCardPrice = ref(filterStore.GET_SELECTED_FILTER().minDivinationCardPrice)

filterStore.$subscribe((mutation, state) => {
  if (state.selectedFilter.minDivinationCardPrice !== minDivinationCardPrice.value) {
    minDivinationCardPrice.value = state.selectedFilter.minDivinationCardPrice
  }
})

function handleMinimumDivinationCardPriceFilter(value: string) {
  if (!value || value.length < 1) {
    filterStore.GET_SELECTED_FILTER().minDivinationCardPrice = undefined
  }
  else {
    const minimumDivinationCardPrice = Number.parseInt(value)
    if (minimumDivinationCardPrice && minimumDivinationCardPrice > 0) {
      filterStore.GET_SELECTED_FILTER().minDivinationCardPrice = minimumDivinationCardPrice
    }
  }
}
</script>

<template>
  <v-label>
    Minimal Price in Chaos Orbs
  </v-label>
  <v-text-field
    v-model="minDivinationCardPrice"
    hide-details
    single-line
    label="Minimal Price in Chaos Orbs"
    type="number"
    variant="outlined"
    style="width: 100%"
    density="compact"
    min="0"
    @update:model-value="val => handleMinimumDivinationCardPriceFilter(val)"
  >
    <template #append>
      <v-tooltip>
        <template #activator="{ props }">
          <v-icon icon="mdi-information-outline" v-bind="props" />
        </template>
        <p>Filter based on the minimal required estimated price of a Divination Card that drops in a Map.</p>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
