<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'

const filterStore = useFilterStore()
const showOverlay = ref(false)
const filterName = ref(filterStore.GET_SELECTED_FILTER().filterName)

function getFilterColor(): string {
  return filterStore.GET_SELECTED_FILTER() ? filterStore.GET_SELECTED_FILTER().filterColor : '#ff0000'
}

function toggleOverlay() {
  showOverlay.value = !showOverlay.value
}

function filterNameChange(filterName: string) {
  filterStore.GET_SELECTED_FILTER().filterName = filterName
}

filterStore.$subscribe((mutation, state) => {
  if (state.filters[state.currentSelectedFilterIndex].filterName !== filterName.value) {
    filterName.value = state.filters[state.currentSelectedFilterIndex].filterName
  }
})
</script>

<template>
  <v-row>
    <v-col cols="5">
      <v-text-field
        v-model="filterName"
        density="compact"
        @update:model-value="val => filterNameChange(val)"
      />
    </v-col>
    <v-spacer />
    <v-col cols="4">
      <v-btn @click="toggleOverlay()">
        Color
        <template #append>
          <v-card :color="getFilterColor()">
            <v-card-text>
              <div class="font-weight-bold h-0 w-0" />
            </v-card-text>
          </v-card>
          <v-dialog
            :model-value="showOverlay"
            width="375"
          >
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-color-picker v-model="filterStore.GET_SELECTED_FILTER().filterColor" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="toggleOverlay"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
