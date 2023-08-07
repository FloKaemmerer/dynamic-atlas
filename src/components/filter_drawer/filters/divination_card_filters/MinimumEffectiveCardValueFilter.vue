<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const minEffectiveDivinationCardValue = ref(filterStore.GET_SELECTED_FILTER().minEffectiveDivinationCardValue)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].minEffectiveDivinationCardValue !== minEffectiveDivinationCardValue.value) {
    minEffectiveDivinationCardValue.value = state.filters[state.currentSelectedFilterIndex].minEffectiveDivinationCardValue
  }
})

function handleMinimumEffectiveDivinationCardValueFilter(value: string) {
  if (!value || value.length < 1) {
    filterStore.GET_SELECTED_FILTER().minEffectiveDivinationCardValue = undefined
  }
  else {
    const minEffectiveDivinationCardValue = Number.parseInt(value)
    if (minEffectiveDivinationCardValue && minEffectiveDivinationCardValue > 0) {
      filterStore.GET_SELECTED_FILTER().minEffectiveDivinationCardValue = minEffectiveDivinationCardValue
    }
  }
}
</script>

<template>
  <v-label>
    Minimal Effective Value in Chaos Orbs
  </v-label>
  <v-text-field
    v-model="minEffectiveDivinationCardValue"
    hide-details
    single-line
    label="Minimal Effective Value in Chaos Orbs"
    type="number"
    variant="outlined"
    style="width: 100%"
    density="compact"
    min="0"
    @update:model-value="val => handleMinimumEffectiveDivinationCardValueFilter(val)"
  >
    <template #append>
      <v-tooltip>
        <template #activator="{ props }">
          <v-icon icon="mdi-information-outline" v-bind="props" />
        </template>
        <p>Filter based on the minimal required Effective Value of a Divination Card that drops in a Map.</p>
        <p>The Effective Value is determined by 'Card sell Price * Base Drop Chance * 100'</p>
        <p>The Filter only takes Cards into account with a price >= 5 Chaos</p>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<style scoped>

</style>
