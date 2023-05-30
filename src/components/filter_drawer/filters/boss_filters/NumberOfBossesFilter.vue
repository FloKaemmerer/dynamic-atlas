<script setup lang="ts">

import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeNumberOfBosses = ref(false)
let numberOfBosses = ref([0, 4])

function handleIncludeNumberOfBossesFilter() {
    filterStore.SET_INCLUDE_NUMBER_OF_BOSSES(!includeNumberOfBosses.value)
}

function debounceNumberOfBossesFilter(value: [number, number]) {
    if (!(value[0] == filterStore.numberOfBosses[0] && value[1] == filterStore.numberOfBosses[1])) {
        filterStore.SET_NUMBER_OF_BOSSES(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Number of Bosses
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeNumberOfBosses"
                        @click="handleIncludeNumberOfBossesFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="numberOfBosses"
                    @update:model-value="value => debounceNumberOfBossesFilter(value)"
                    strict
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="4"
                    :min="0"
                    :disabled="!includeNumberOfBosses"
            >
                <template v-slot:prepend>
                    <v-label style="white-space: break-spaces">{{
                        numberOfBosses[0]
                        }}
                    </v-label>
                </template>
                <template v-slot:append>
                    <v-label style="white-space: break-spaces">{{
                        numberOfBosses[1]
                        }}
                    </v-label>
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>