<script setup lang="ts">
import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeBaseMobCount = ref(false)
let baseMobCount = ref([0, 10])

function handleIncludeBaseMobCountFilter() {
    filterStore.SET_INCLUDE_BASE_MOB_COUNT(!includeBaseMobCount.value)
}

function debounceBaseMobCountFilter(value: [number, number]) {
    if (!(value[0] == filterStore.baseMobCount[0] && value[1] == filterStore.baseMobCount[1])) {
        filterStore.SET_BASE_MOB_COUNT(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Base Mob Count
            <v-tooltip
                    text="The Base Mob count of Monsters present in the normal version of the map.">
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeBaseMobCount"
                        @click="handleIncludeBaseMobCountFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="baseMobCount"
                    @update:model-value="value => debounceBaseMobCountFilter(value)"
                    strict
                    direction="horizontal"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="10"
                    :min="1"
                    :disabled="!includeBaseMobCount"
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