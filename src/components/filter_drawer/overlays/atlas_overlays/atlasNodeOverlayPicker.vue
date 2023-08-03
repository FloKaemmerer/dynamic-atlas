<script setup lang="ts">
import { ref, watch } from 'vue'
import { handleAtlasNodeOverlay } from '@/composable/atlas-node-overlay-handler'
import { OverlayKeys } from '@/model/overlayKeys'

const activeAtlasNodeOverlay = ref('none')

watch(activeAtlasNodeOverlay, () => {
  handleAtlasNodeOverlay(activeAtlasNodeOverlay.value)
})
</script>

<template>
  <v-radio-group v-model="activeAtlasNodeOverlay">
    <v-radio
      label="None"
      value="none"
      density="compact"
    />
    <v-radio
      label="Openness"
      :value="OverlayKeys.OPENNESS_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Traversability"
      :value="OverlayKeys.TRAVERSABILITY_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Linearity"
      :value="OverlayKeys.LINEARITY_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Terrain Slots"
      :value="OverlayKeys.TERRAIN_SLOTS_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Backtrack Factor"
      :value="OverlayKeys.BACKTRACK_FACTOR_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Base Mob Count"
      :value="OverlayKeys.BASE_MOB_COUNT_OVERLAY"
      density="compact"
    />
  </v-radio-group>
</template>

<style scoped>

</style>
