<script setup lang="ts">
import { useFilterStore } from '@/store/FilterStore'

interface PropsInterface {
  toggle: boolean
}

defineProps<PropsInterface>()
const emit = defineEmits(['update:toggle'])

const filterStore = useFilterStore()
</script>

<template>
  <v-dialog :model-value="toggle" width="375" @update:modelValue="emit('update:toggle', $event)">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-color-picker v-model="filterStore.GET_SELECTED_FILTER().color" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="filterStore.GET_SELECTED_FILTER().name" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
