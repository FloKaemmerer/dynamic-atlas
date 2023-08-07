<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import ColorPickerOverlay from '@/components/filter_drawer/ColorPickerOverlay.vue'

const filterStore = useFilterStore()
const showOverlay = ref(false)
const filterName = ref(filterStore.GET_SELECTED_FILTER().filterName)

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].filterName !== filterName.value) {
    filterName.value = state.filters[state.currentSelectedFilterIndex].filterName
  }
})

function deleteFilter() {
  filterStore.DELETE_CURRENT_FILTER()
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <v-btn
        class="mx-1" @click="showOverlay = !showOverlay"
      >
        {{ filterName }}
        <template #append>
          <v-icon icon="mdi-pencil-outline" />
        </template>
        <template #prepend>
          <v-card :color="filterStore.GET_SELECTED_FILTER().filterColor">
            <v-card-text>
              <div class="font-weight-bold h-0 w-0" />
            </v-card-text>
          </v-card>
          <ColorPickerOverlay :toggle="showOverlay" />
        </template>
      </v-btn>
    </v-col>
    <v-spacer />
    <v-col cols="1">
      <v-btn icon="mdi-trash-can-outline" :disabled="filterStore.filters.length <= 1" @click="deleteFilter()" />
    </v-col>
  </v-row>
</template>
