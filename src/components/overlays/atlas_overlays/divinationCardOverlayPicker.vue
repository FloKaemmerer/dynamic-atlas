<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { handleDivinationCardOverlay } from '@/composable/divination-card-overlay-handler'
import { OverlayKeys } from '@/model/overlayKeys'

const atlasNodeStore = useAtlasNodeStore()
const activeDivinationCardOverlay = ref('none')
const selectedDivinationCardName = ref()

watch([activeDivinationCardOverlay, selectedDivinationCardName], () => {
  console.log(`Selected Divination Card Name: ${selectedDivinationCardName.value}`)
  handleDivinationCardOverlay(activeDivinationCardOverlay.value, selectedDivinationCardName.value)
})
</script>

<template>
  <v-radio-group v-model="activeDivinationCardOverlay" density="comfortable">
    <v-radio
      label="None"
      value="none"
    />
    <v-radio
      :value="OverlayKeys.BASE_DROP_CHANCE"
      density="comfortable"
    >
      <template #label>
        <v-select
          v-model="selectedDivinationCardName"
          label="Base Drop Chance"
          :items="atlasNodeStore.dropRestrictedDivinationCardNames"
          variant="outlined"
          :clearable="true"
          density="compact"
        >
          <template #append>
            <v-tooltip>
              <template #activator="{ props }">
                <v-icon icon="mdi-information-outline" v-bind="props" />
              </template>
              <p>The Base Drop Chance is the Chance that IF a Divination Card drops it is that Card.</p>
              <p>It is not the overall Chance to find that card!</p>
              <p>The Value is determined by 'Card drop Weight / Total Div Card Droppool size'</p>
            </v-tooltip>
          </template>
        </v-select>
      </template>
    </v-radio>
    <v-radio
      label="Highest Card Price"
      :value="OverlayKeys.HIGHEST_CARD_PRICE_OVERLAY"
      density="compact"
    />
    <v-radio
      label="Highest effective Value"
      :value="OverlayKeys.HIGHEST_EFFECTIVE_VALUE_OVERLAY"
      density="compact"
    />
  </v-radio-group>
</template>

<style scoped>

</style>
