<script setup lang="ts">

import {ref, watch} from "vue";
import {handleOverlay} from "@/composable/overlayHandler";

let activeOverlay = ref('none')

watch(activeOverlay, () => {
    console.log("Activating overlay for: " + activeOverlay.value)
    handleOverlay(activeOverlay.value)
});
</script>

<template>
    <v-card>
        <v-toolbar density="compact">
            <v-toolbar-title class="text-h6">
                Overlays
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>Overlays</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-radio-group v-model="activeOverlay">
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
                            <v-radio label="Backtrack Factor"
                                     value="backtrackFactorOverlay"
                                     density="compact"
                            ></v-radio>
                            <v-radio label="Base Mob Count"
                                     value="baseMobCountOverlay"
                                     density="compact"
                            ></v-radio>
                        </v-radio-group>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>