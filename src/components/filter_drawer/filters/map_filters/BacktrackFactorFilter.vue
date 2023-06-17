<script setup lang="ts">
import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeBacktrackFactor = ref(filterStore.includeBacktrackFactor)

let backtrackFactor = ref(filterStore.backtrackFactor)

filterStore.$subscribe((mutation, state) => {
    if (state.includeBacktrackFactor != includeBacktrackFactor.value) {
        includeBacktrackFactor.value = state.includeBacktrackFactor
    }
    if (state.backtrackFactor != backtrackFactor.value) {
        backtrackFactor.value = state.backtrackFactor
    }
})

function handleIncludeBacktrackFactorFilter() {
    filterStore.SET_INCLUDE_BACKTRACK_FACTOR(!includeBacktrackFactor.value)
}

function debounceBacktrackFactorFilter(value: [number, number]) {
    if (!(value[0] == filterStore.backtrackFactor[0] && value[1] == filterStore.backtrackFactor[1])) {
        filterStore.SET_BACKTRACK_FACTOR(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Backtrack Factor
            <v-tooltip
                    text="A low Backtrack Factor means, that a map can be cleared without the need to Backtrack">
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeBacktrackFactor"
                        @click="handleIncludeBacktrackFactorFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="backtrackFactor"
                    @update:model-value="value => debounceBacktrackFactorFilter(value)"
                    strict
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="10"
                    :min="0"
                    :disabled="!includeBacktrackFactor"
            >
                <template v-slot:prepend>
                    None
                </template>
                <template v-slot:append>
                    Alot
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>