<script setup lang="ts">

import MapTierFilter from "@/components/filter_drawer/filters/map_filters/MapTierFilter.vue";
import OpennessFilter from "@/components/filter_drawer/filters/map_filters/OpennessFilter.vue";
import TraversabilityFilter from "@/components/filter_drawer/filters/map_filters/TraversabilityFilter.vue";
import BacktrackFactorFilter from "@/components/filter_drawer/filters/map_filters/BacktrackFactorFilter.vue";
import LinearityFilter from "@/components/filter_drawer/filters/map_filters/LinearityFilter.vue";
import RushableBossFilter from "@/components/filter_drawer/filters/map_filters/RushableBossFilter.vue";
import BaseMobCountFilter from "@/components/filter_drawer/filters/map_filters/BaseMobCountFilter.vue";
</script>

<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>Map Filters</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <MapTierFilter/>
                        <OpennessFilter/>
                        <TraversabilityFilter/>
                        <BacktrackFactorFilter/>
                        <LinearityFilter/>
                        <BaseMobCountFilter/>
                        <RushableBossFilter/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>