<script setup lang="ts">

import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeOpenness = ref(filterStore.includeOpenness)
let openness = ref(filterStore.openness)

function handleIncludeOpennessFilter() {
    filterStore.SET_INCLUDE_OPENNESS(!includeOpenness.value)
}

function debounceOpennessFilter(value: [number, number]) {
    if (!(value[0] == filterStore.openness[0] && value[1] == filterStore.openness[1])) {
        filterStore.SET_OPENNESS(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Openness
            <v-tooltip
                    text="Openness = Narrow = Toxic Sewers; Openness = Open = Dunes">
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeOpenness"
                        @click="handleIncludeOpennessFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="openness"
                    @update:model-value="value => debounceOpennessFilter(value)"
                    strict
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="10"
                    :disabled="!includeOpenness"
            >
                <template v-slot:prepend>
                    <v-label style="white-space: break-spaces">Narrow</v-label>
                </template>
                <template v-slot:append>
                    <v-label style="white-space: break-spaces">Open</v-label>
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>