<script setup lang="ts">

import NumberOfBossesFilter from "@/components/filters/boss_filters/NumberOfBossesFilter.vue";
import PhasedBossesFilter from "@/components/filters/boss_filters/PhasedBossesFilter.vue";
import SkippablePhasesFilter from "@/components/filters/boss_filters/SkippablePhasesFilter.vue";
import SpawnIntroFilter from "@/components/filters/boss_filters/SpawnIntroFilter.vue";
import SpawnedBossesFilter from "@/components/filters/boss_filters/SpawnedBossesFilter.vue";
</script>

<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>Boss Filters</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <NumberOfBossesFilter/>
                        <PhasedBossesFilter/>
                        <SkippablePhasesFilter/>
                        <SpawnIntroFilter/>
                        <SpawnedBossesFilter/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>