<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const filterText = ref()

function handleTextFilter(value: string) {
  filterStore.SET_FILTER_TEXT(value)
}

filterStore.$subscribe((mutation, state) => {
  if (state.filterText !== filterText.value) {
    filterText.value = state.filterText
  }
})
</script>

<template>
  <v-text-field
    id="mapTextFilter"
    v-model="filterText"
    density="compact"
    variant="underlined"
    label="Filter... (eg: Doctor|Nurse|Patient)"
    prepend-inner-icon="mdi-magnify"
    single-line
    class="mx-2 mb-4"
    color="#198754"
    :hide-details="true"
    clearable
    @update:model-value="val => handleTextFilter(val)"
  />
</template>

<style scoped>

</style>
