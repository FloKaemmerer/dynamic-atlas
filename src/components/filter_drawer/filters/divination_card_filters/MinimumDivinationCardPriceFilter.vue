<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const minDivinationCardPrice = ref(filterStore.minDivinationCardPrice)

filterStore.$subscribe((mutation, state) => {
  if (state.minDivinationCardPrice !== minDivinationCardPrice.value) {
    minDivinationCardPrice.value = state.minDivinationCardPrice
  }
})

function handleMinimumDivinationCardPriceFilter(value: string) {
  filterStore.SET_MINIMUM_DIVINATION_CARD_PRICE(Number.parseInt(value))
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
