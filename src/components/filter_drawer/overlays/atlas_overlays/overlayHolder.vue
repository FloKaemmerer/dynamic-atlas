<script setup lang="ts">
import AtlasNodeOverlayPicker from '@/components/filter_drawer/overlays/atlas_overlays/atlasNodeOverlayPicker.vue'
import DivinationCardOverlayPicker
  from '@/components/filter_drawer/overlays/atlas_overlays/divinationCardOverlayPicker.vue'
</script>

<template>
  <v-card class="mt-4" color="grey-darken-3" flat>
    <v-toolbar color="grey-darken-4" density="compact">
      <v-toolbar-title class="text-h6">
        Overlays
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-subtitle-1">
            Map Overlays
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <AtlasNodeOverlayPicker />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title class="text-subtitle-1">
            Divination Card Overlays
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <DivinationCardOverlayPicker />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
