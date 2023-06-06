<script setup lang="ts">
import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeTerrainSlots = ref(filterStore.includeTerrainSlots)
let terrainSlots = ref(filterStore.terrainSlots)

filterStore.$subscribe((mutation, state) => {
    if (state.includeTerrainSlots != includeTerrainSlots.value) {
        includeTerrainSlots.value = state.includeTerrainSlots
    }
    if (state.terrainSlots != terrainSlots.value) {
        terrainSlots.value = state.terrainSlots
    }
})

function handleIncludeTerrainSlotsFilter() {
    filterStore.SET_INCLUDE_TERRAIN_SLOTS(!includeTerrainSlots.value)
}

function debounceTerrainSlotsFilter(value: [number, number]) {
    if (!(value[0] == filterStore.terrainSlots[0] && value[1] == filterStore.terrainSlots[1])) {
        filterStore.SET_TERRAIN_SLOTS(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Terrain Slots
            <v-tooltip
                    text="The number of slots within the map terrain, which can spawn a League Mechanic, aka the juiceability of a Map.">
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeTerrainSlots"
                        @click="handleIncludeTerrainSlotsFilter()"
                        density="compact"
            ></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="terrainSlots"
                    @update:model-value="value => debounceTerrainSlotsFilter(value)"
                    strict
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="10"
                    :min="0"
                    :disabled="!includeTerrainSlots"
            >
                <template v-slot:prepend>
                    <v-label style="white-space: break-spaces">Low
                    </v-label>
                </template>
                <template v-slot:append>
                    <v-label style="white-space: break-spaces">High
                    </v-label>
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>