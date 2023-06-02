<script setup lang="ts">

import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeTraversability = ref(filterStore.includeTraversability)
let traversability = ref(filterStore.traversability)

function handleIncludeTraversabilityFilter() {
    filterStore.SET_INCLUDE_TRAVERSABILITY(!includeTraversability.value)
}

function debounceTraversabilityFilter(value: [number, number]) {
    if (!(value[0] == filterStore.traversability[0] && value[1] == filterStore.traversability[1])) {
        filterStore.SET_TRAVERSABILITY(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Traversability
            <v-tooltip
                    text="Traversability is the Factor how easy it is to travers the map using a Skill like Shield Charge">
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeTraversability"
                        @click="handleIncludeTraversabilityFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="traversability"
                    strict
                    @update:model-value="value => debounceTraversabilityFilter(value)"
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="10"
                    :disabled="!includeTraversability"
            >
                <template v-slot:prepend>
                    <v-label style="white-space: break-spaces">Annoying</v-label>
                </template>
                <template v-slot:append>
                    <v-label style="white-space: break-spaces">Easy</v-label>
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>