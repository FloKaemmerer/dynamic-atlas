<script setup lang="ts">

import MapTierFilter from "@/components/filter_drawer/filters/map_filters/MapTierFilter.vue";
import OpennessFilter from "@/components/filter_drawer/filters/map_filters/OpennessFilter.vue";
import TraversabilityFilter from "@/components/filter_drawer/filters/map_filters/TraversabilityFilter.vue";
import BacktrackFactorFilter from "@/components/filter_drawer/filters/map_filters/BacktrackFactorFilter.vue";
import LinearityFilter from "@/components/filter_drawer/filters/map_filters/LinearityFilter.vue";
import RushableBossFilter from "@/components/filter_drawer/filters/map_filters/RushableBossFilter.vue";
import BaseMobCountFilter from "@/components/filter_drawer/filters/map_filters/BaseMobCountFilter.vue";
import TerrainSlotsFilter from "@/components/filter_drawer/filters/map_filters/TerrainSlotsFilter.vue";
import {ref} from "vue";
import {useActiveFiltersStore} from "@/store/activeFiltersStore";
import {useFilterStore} from "@/store/FilterStore";

const activeFiltersStore = useActiveFiltersStore();
const filterStore = useFilterStore();

let activeMapFilters = ref(activeFiltersStore.activeMapFilters.length)
let panel = ref()

activeFiltersStore.$subscribe((mutation, state) => {
    if (state.activeMapFilters.length != activeMapFilters.value) {
        activeMapFilters.value = state.activeMapFilters.length
    }
})

function clearActiveMapFilters() {
    filterStore.CLEAR_MAP_FILTERS()
    panel.value = []
    setTimeout(() => {
        panel.value = []
    }, 10);
}
</script>

<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-expansion-panels v-model="panel">
                    <v-expansion-panel value="mapPanel">
                        <v-expansion-panel-title>
                            <v-row no-gutters>
                                <v-col cols="6" class="d-flex justify-start">
                                    <strong>Map Filters</strong>
                                </v-col>
                                <v-col cols="6" class="text--secondary">
                                    <v-fade-transition leave-absolute>
                                        <span v-if=" activeMapFilters > 0"
                                              key="0">
                                            <v-row no-gutters>
                                                <v-col cols="10">
                                                Active: {{ activeMapFilters }}
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-tooltip>
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn icon="mdi-close-circle"
                                                                   @click="clearActiveMapFilters()"
                                                                   density="compact"
                                                                   v-bind="props"
                                                                   variant="text"
                                                                   :disabled="activeMapFilters < 1"></v-btn>
                                                        </template>
                                                        <p>Clear Active Map Filters</p>
                                                    </v-tooltip>
                                                </v-col>
                                        </v-row>
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <MapTierFilter/>
                            <OpennessFilter/>
                            <TraversabilityFilter/>
                            <BacktrackFactorFilter/>
                            <LinearityFilter/>
                            <TerrainSlotsFilter/>
                            <BaseMobCountFilter/>
                            <RushableBossFilter/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>