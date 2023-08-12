<script setup lang="ts">
import { useFilterStore } from '@/store/FilterStore'

interface PropsInterface {
  toggle: boolean
}

const props = defineProps<PropsInterface>()

const emit = defineEmits(['update:toggle'])
const filterStore = useFilterStore()
</script>

<template>
  <v-dialog :model-value="toggle" width="450" @update:modelValue="emit('update:toggle', $event)">
    <v-card>
      <v-card-text>
        <v-container>
          <h1>Paste Filter Preset(s)</h1>
          <v-textarea />
          <v-btn>Add</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
