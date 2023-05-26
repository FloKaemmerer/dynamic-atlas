<script setup lang="ts">

import {ref, watch} from "vue";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import {handleDivinationCardOverlay} from "@/composable/divination-card-overlay-handler";


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
        <v-radio value="baseDropChance"
                 density="comfortable"
        >
            <template v-slot:label>
                <v-select label="Base Drop Chance"
                          v-model="selectedDivinationCardName"
                          :items="atlasNodeStore.dropRestrictedDivinationCardNames"
                          variant="outlined"
                          clearable
                          density="compact"></v-select>
            </template>
        </v-radio>

    </v-radio-group>
</template>

<style scoped>

</style>