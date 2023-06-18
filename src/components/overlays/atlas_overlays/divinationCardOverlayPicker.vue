<script setup lang="ts">

import {ref, watch} from "vue";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {handleDivinationCardOverlay} from "@/composable/divination-card-overlay-handler";
import {OverlayKeys} from "@/model/overlayKeys";


const atlasNodeStore = useAtlasNodeStore();
let activeDivinationCardOverlay = ref('none')
let selectedDivinationCardName = ref()

watch([activeDivinationCardOverlay, selectedDivinationCardName], () => {
  console.log("Selected Divination Card Name: " + selectedDivinationCardName.value)
  handleDivinationCardOverlay(activeDivinationCardOverlay.value, selectedDivinationCardName.value)
})
</script>

<template>
  <v-radio-group v-model="activeDivinationCardOverlay" density="comfortable">
    <v-radio label="None"
             value="none"
    ></v-radio>
    <v-radio :value="OverlayKeys.BASE_DROP_CHANCE"
             density="comfortable"
    >
      <template v-slot:label>
        <v-select label="Base Drop Chance"
                  v-model="selectedDivinationCardName"
                  :items="atlasNodeStore.dropRestrictedDivinationCardNames"
                  variant="outlined"
                  clearable
                  density="compact">

          <template v-slot:append>
            <v-tooltip>
              <template v-slot:activator="{ props }">
                <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
              </template>
              <p>The Base Drop Chance is the Chance that IF a Divination Card drops it is that Card.</p>
              <p>It is not the overall Chance to find that card!</p>
              <p>The Value is determined by 'Card drop Weight / Total Div Card Droppool size'</p>
            </v-tooltip>
          </template>
        </v-select>
      </template>
    </v-radio>
    <v-radio label="Highest Card Price"
             :value="OverlayKeys.HIGHEST_CARD_PRICE_OVERLAY"
             density="compact">
    </v-radio>
    <v-radio label="Highest effective Value"
             :value="OverlayKeys.HIGHEST_EFFECTIVE_VALUE_OVERLAY"
             density="compact">
    </v-radio>
  </v-radio-group>
</template>

<style scoped>

</style>