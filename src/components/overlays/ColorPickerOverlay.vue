<script setup lang="ts">
import { computed } from 'vue'
import { useFilterStore } from '@/store/FilterStore'
import type { Filter } from '@/model/filter/filter'

interface PropsInterface {
  toggle: boolean
  filterId: number
}

const props = defineProps<PropsInterface>()

const emit = defineEmits(['update:toggle'])
const filterStore = useFilterStore()
const filter = computed<Filter | undefined>(() => filterStore.filtersMap.get(props.filterId))
</script>

<template>
  <v-dialog v-if="filter" :model-value="toggle" width="375" @update:modelValue="emit('update:toggle', $event)">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-color-picker v-model="filter.color" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="filter.name" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
