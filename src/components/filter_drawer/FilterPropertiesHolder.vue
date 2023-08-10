<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'

const filterStore = useFilterStore()
const showOverlay = ref(false)
const filterName = ref(filterStore.GET_SELECTED_FILTER().name)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].name !== filterName.value) {
    filterName.value = state.filters[state.currentSelectedFilterIndex].name
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
        <v-icon :color="filterStore.GET_SELECTED_FILTER().color" class="mr-1" icon="mdi-checkbox-blank-circle" />
      </template>
    </v-btn>
    <v-spacer />
    <v-btn variant="text" class="text-offwhite" icon="mdi-trash-can-outline" :disabled="filterStore.filters.length <= 1" @click="deleteFilter()" />

    <ColorPickerOverlay v-model:toggle="showOverlay" />
  </div>
</template>
