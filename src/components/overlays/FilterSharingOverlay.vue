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

const presetSnackbar = ref(false)
function copyPreset() {
  copyToClipBoard(getFilterPreset())
  presetSnackbar.value = true
}

const urlSnackbar = ref(false)
function copyUrl() {
  copyToClipBoard(getFilterPreset())
  urlSnackbar.value = true
}
</script>

<template>
  <v-dialog :model-value="toggle" width="500" @update:modelValue="emit('update:toggle', $event)">
    <v-card color="black" class="text-offwhite pb-8 pt-2">
      <v-card-title>
        Select Filters to include
      </v-card-title>
      <v-card-text>
        <div v-for="[id, filter] in filterStore.filtersMap" :key="id">
          <v-checkbox
            v-model="filtersToInclude"
            :value="filter.id"
          >
            <template #label>
              <v-icon :color="filter.color" class="mr-1" icon="mdi-checkbox-blank-circle" />
              {{ filter.name }}
            </template>
          </v-checkbox>
        </div>
        <v-expand-transition>
          <div v-if="filtersToInclude.length" class="mt-8">
            <v-text-field
              id="filter-preset"
              :model-value="getFilterPreset()"
              :contenteditable="false"
              :readonly="true"
              label="Filter Preset"
              append-icon="mdi-content-copy"
              @click:append="copyPreset"
            />
            <v-snackbar
              v-model="presetSnackbar"
              color="accent"
              :timeout="2500"
            >
              Preset copied to clipboard
            </v-snackbar>
            <v-text-field
              :model-value="getUrl()"
              :contenteditable="false"
              :readonly="true"
              label="URL"
              append-icon="mdi-content-copy"
              @click:append="copyUrl"
            />
            <v-snackbar
              v-model="urlSnackbar"
              color="accent"
              :timeout="2500"
            >
              URL copied to clipboard
            </v-snackbar>
          </div>
        </v-expand-transition>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
