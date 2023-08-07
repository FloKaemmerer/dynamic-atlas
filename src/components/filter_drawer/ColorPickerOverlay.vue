<script setup lang="ts">
import { useFilterStore } from '@/store/FilterStore'

interface PropsInterface {
  toggle: boolean
}

defineProps<PropsInterface>()

const filterStore = useFilterStore()
</script>

<template>
  <v-dialog :model-value="toggle" width="375">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-color-picker v-model="filterStore.GET_SELECTED_FILTER().filterColor" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <!--        <v-btn -->
        <!--          color="blue-darken-1" variant="text" -->
        <!--          @click="showOverlay = !showOverlay" -->
        <!--        > -->
        <!--          Close -->
        <!--        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
