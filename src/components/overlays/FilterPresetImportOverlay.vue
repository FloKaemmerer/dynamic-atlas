<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import type { Filter } from '@/model/filter/filter'
import { useActiveFiltersStore } from '@/store/activeFiltersStore'

interface PropsInterface {
  toggle: boolean
}

defineProps<PropsInterface>()

const emit = defineEmits(['update:toggle'])
const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()

const filterPreset = ref<string>('')

function addPresetToFilters() {
  try {
    const preset = filterPreset.value
    if (preset) {
      if (preset.startsWith('[') && preset.endsWith(']')) {
        const filters: Filter[] = JSON.parse(preset)
        console.log(filters)
        filters.map(filter => filterStore.filtersMap.set(filter.id, filter))

        activeFiltersStore.activeFiltersMap = new Map()
        filters.map(filter => activeFiltersStore.activeFiltersMap.set(filter.id, {
          id: filter.id,
          activeMapFilters: [],
          activeTextFilters: [],
          activeBossFilters: [],
          activeDivinationCardFilters: [],
        }))
      }
      else {
        const filter: Filter = JSON.parse(preset)
        filterStore.filtersMap.set(filter.id, filter)
        activeFiltersStore.activeFiltersMap.set(filter.id, {
          id: filter.id,
          activeMapFilters: [],
          activeTextFilters: [],
          activeBossFilters: [],
          activeDivinationCardFilters: [],
        })
        console.log(filter)
      }
    }
  }
  catch (e) {
    console.log(e)
    // TODO show Toast that adding failed
  }
}
</script>

<template>
  <v-dialog :model-value="toggle" width="450" @update:modelValue="emit('update:toggle', $event)">
    <v-card>
      <v-card-text>
        <v-container>
          <h1>Paste Filter Preset(s)</h1>
          <v-textarea v-model="filterPreset" />
          <v-btn @click="addPresetToFilters()">
            Add
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
