<script setup lang="ts">
import {ref, watch} from "vue";
import {handleAtlasNodeOverlay} from "@/composable/atlas-node-overlay-handler";

let activeAtlasNodeOverlay = ref('none')

watch(activeAtlasNodeOverlay, () => {
    console.log("Activating overlay for: " + activeAtlasNodeOverlay.value)
    handleAtlasNodeOverlay(activeAtlasNodeOverlay.value)
});
</script>

<template>
    <v-radio-group v-model="activeAtlasNodeOverlay">
        <v-radio label="None"
                 value="none"
                 density="compact"></v-radio>
        <v-radio label="Openness"
                 value="opennessOverlay"
                 density="compact">
        </v-radio>
        <v-radio label="Traversability"
                 value="traversabilityOverlay"
                 density="compact"
        ></v-radio>
        <v-radio label="Linearity" value="linearityOverlay"
                 density="compact"
        ></v-radio>
        <v-radio label="Terrain Slots" value="terrainSlotsOverlay"
                 density="compact"
        ></v-radio>
        <v-radio label="Backtrack Factor"
                 value="backtrackFactorOverlay"
                 density="compact"
        ></v-radio>
        <v-radio label="Base Mob Count"
                 value="baseMobCountOverlay"
                 density="compact"
        ></v-radio>
    </v-radio-group>
</template>

<style scoped>

</style>