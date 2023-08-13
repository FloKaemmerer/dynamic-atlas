<script setup lang="ts">
import AtlasNodeOverlayPicker from '@/components/overlays/atlas_overlays/atlasNodeOverlayPicker.vue'
import DivinationCardOverlayPicker
  from '@/components/overlays/atlas_overlays/divinationCardOverlayPicker.vue'
</script>

<template>
  <v-card class="mt-4" color="transparent" flat>
    <v-toolbar density="compact">
      <v-toolbar-title class="text-h6">
        Overlays
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel bg-color="black">
          <v-expansion-panel-title class="text-subtitle-1 text-offwhite">
            <v-row no-gutters>
              <v-col class="d-inline-flex align-center" cols="7">
                Map Overlays
              </v-col>
            </v-row>
            <template #actions="{ expanded }">
              <v-icon :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'" />
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="text-offwhite">
            <AtlasNodeOverlayPicker />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel bg-color="black">
          <v-expansion-panel-title class="text-subtitle-1 text-offwhite">
            <v-row no-gutters>
              <v-col class="d-inline-flex align-center">
                Divination Card Overlays
              </v-col>
            </v-row>
            <template #actions="{ expanded }">
              <v-icon :icon="expanded ? 'mdi-menu-up' : 'mdi-menu-down'" />
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="text-offwhite">
            <DivinationCardOverlayPicker />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
