<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'

const filterStore = useFilterStore()
const showOverlay = ref(false)
const filterName = ref(filterStore.GET_SELECTED_FILTER().name)

filterStore.$subscribe((mutation, state) => {
  if (state.selectedFilter.name !== filterName.value) {
    filterName.value = state.selectedFilter.name
  }
})

function deleteFilter() {
  filterStore.DELETE_CURRENT_FILTER()
}
</script>

<template>
  <div class="d-flex align-center mb-6">
    <v-btn
      variant="text"
      class="text-offwhite"
      @click="showOverlay = !showOverlay"
    >
      {{ filterName }}
      <template #append>
        <v-icon icon="mdi-pencil-outline" />
      </template>
      <template #prepend>
        <v-icon :color="filterStore.selectedFilter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
      </template>
    </v-btn>
    <v-spacer />
    <v-btn variant="text" class="text-offwhite" icon="mdi-trash-can-outline" :disabled="filterStore.filtersMap.size <= 1" @click="deleteFilter()" />

    <ColorPickerOverlay v-model:toggle="showOverlay" v-model:filter-id="filterStore.selectedFilter.id" />
  </div>
</template>
