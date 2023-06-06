<script setup lang="ts">

import NumberOfBossesFilter from "@/components/filter_drawer/filters/boss_filters/NumberOfBossesFilter.vue";
import PhasedBossesFilter from "@/components/filter_drawer/filters/boss_filters/PhasedBossesFilter.vue";
import SkippablePhasesFilter from "@/components/filter_drawer/filters/boss_filters/SkippablePhasesFilter.vue";
import SpawnIntroFilter from "@/components/filter_drawer/filters/boss_filters/SpawnIntroFilter.vue";
import SpawnedBossesFilter from "@/components/filter_drawer/filters/boss_filters/SpawnedBossesFilter.vue";
import {ref} from "vue";
import {useActiveFiltersStore} from "@/store/activeFiltersStore";
import {useFilterStore} from "@/store/FilterStore";

const activeFiltersStore = useActiveFiltersStore();
const filterStore = useFilterStore();

let activeBossFilters = ref(activeFiltersStore.activeBossFilters.length)
let panel = ref()

activeFiltersStore.$subscribe((mutation, state) => {
    console.log("activeBossFilters value: " + activeBossFilters.value + "\nstate: " + state.activeBossFilters)
    if (state.activeBossFilters.length != activeBossFilters.value) {
        activeBossFilters.value = state.activeBossFilters.length
    }
})

function clearActiveBossFilters() {
    filterStore.CLEAR_BOSS_FILTERS()
    panel.value = []
    setTimeout(() => {
        panel.value = []
    }, 50);

}
</script>

<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-expansion-panels v-model="panel">
                    <v-expansion-panel value="bossPanel">
                        <v-expansion-panel-title>
                            <v-row no-gutters>
                                <v-col cols="6" class="d-flex justify-start">
                                    <strong>Boss Filters</strong>
                                </v-col>
                                <v-col cols="6" class="text--secondary">
                                    <v-fade-transition leave-absolute>
                                        <span v-if=" activeBossFilters > 0"
                                              key="0">
                                            <v-row no-gutters>
                                                <v-col cols="10">
                                                Active: {{ activeBossFilters }}
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-tooltip>
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn icon="mdi-close-circle"
                                                                   @click="clearActiveBossFilters()"
                                                                   density="compact"
                                                                   v-bind="props"
                                                                   :disabled="activeBossFilters < 1"></v-btn>
                                                        </template>
                                                        <p>Clear Active Boss Filters</p>
                                                    </v-tooltip>
                                                </v-col>
                                        </v-row>
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <NumberOfBossesFilter/>
                            <PhasedBossesFilter/>
                            <SkippablePhasesFilter/>
                            <SpawnIntroFilter/>
                            <SpawnedBossesFilter/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>