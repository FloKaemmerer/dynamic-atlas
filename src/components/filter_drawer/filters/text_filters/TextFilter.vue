<script setup lang="ts">
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
</script>

<template>
  <v-text-field
    id="mapTextFilter"
    v-model="filterStore.GET_SELECTED_FILTER().filterText"
    density="compact"
    label="Filter... (eg: Doctor|Nurse|Patient)"
    prepend-inner-icon="mdi-magnify"
    single-line
    class="mb-4"
    color="#FFF8E1"
    bg-color="grey-darken-4"
    :hide-details="true"
    clearable
  />
</template>

<style scoped>

</style>
