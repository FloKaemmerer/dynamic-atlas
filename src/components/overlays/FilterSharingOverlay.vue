<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import copyToClipBoard from '@/composable/copy-utils'
import { buildShareableUrlFromPreset } from '@/composable/filter/shareable-url-builder'

interface PropsInterface {
  toggle: boolean
}

defineProps<PropsInterface>()

const emit = defineEmits(['update:toggle'])
const filterStore = useFilterStore()

const filtersToInclude = ref<number[]>([])
const filterPreset = ref<string>('')
function getFilterPreset() {
  const filters = []
  for (let i = 0; i < filtersToInclude.value.length; i++) {
    const filter = filterStore.filtersMap.get(filtersToInclude.value[i])
    filters.push(filter)
  }
  filterPreset.value = JSON.stringify(filters)
  if (filters.length > 0) {
    return JSON.stringify(filters)
  }
  else {
    return ''
  }
}

function getUrl() {
  if (getFilterPreset().length > 0) {
    return buildShareableUrlFromPreset(getFilterPreset())
  }
  else {
    return `${import.meta.env.VITE_BASE_URL}`
  }
}

function copyPreset() {
  copyToClipBoard(getFilterPreset())
}

function copyUrl() {
  copyToClipBoard(getFilterPreset())
}
</script>

<template>
  <v-dialog :model-value="toggle" width="700" @update:modelValue="emit('update:toggle', $event)">
    <v-card>
      <v-card-text>
        <v-container :fluid="true">
          <h1>Select Filters to Include</h1>
          <li v-for="[id, filter] in filterStore.filtersMap" :key="id">
            <v-checkbox
              v-model="filtersToInclude"
              :value="filter.id"
            >
              <template #label>
                <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
                {{ filter.name }}
              </template>
            </v-checkbox>
          </li>
          <h1>Filter Preset</h1>
          <v-text-field
            :model-value="getFilterPreset()"
            :contenteditable="false"
            :readonly="true"
            class="mx-1"
            label="Preset"
            variant="outlined"
            append-icon="mdi-content-copy"
            @click:append="copyPreset"
          />
          <h1>URL</h1>
          <v-text-field
            :model-value="getUrl()"
            :contenteditable="false"
            :readonly="true"
            class="mx-1"
            label="URL"
            variant="outlined"
            append-icon="mdi-content-copy"
            @click:append="copyUrl"
          />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
