<script setup lang="ts">

import MinimumDivinationCardPriceFilter
    from "@/components/filter_drawer/filters/divination_card_filters/MinimumDivinationCardPriceFilter.vue";
import MinimumEffectiveCardValueFilter
    from "@/components/filter_drawer/filters/divination_card_filters/MinimumEffectiveCardValueFilter.vue";
import {ref} from "vue";
import {useActiveFiltersStore} from "@/store/activeFiltersStore";
import {useFilterStore} from "@/store/FilterStore";

const activeFiltersStore = useActiveFiltersStore();
const filterStore = useFilterStore();

let activeDivinationCardFilters = ref(activeFiltersStore.activeDivinationCardFilters.length)
let panel = ref()


activeFiltersStore.$subscribe((mutation, state) => {
    console.log("activeDivinationCardFilters value: " + activeDivinationCardFilters.value + "\nstate: " + state.activeDivinationCardFilters)
    if (state.activeDivinationCardFilters.length != activeDivinationCardFilters.value) {
        activeDivinationCardFilters.value = state.activeDivinationCardFilters.length
    }
})


function clearActiveDivinationCardFilters() {
    filterStore.CLEAR_DIVINATION_CARD_FILTERS()
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
                    <v-expansion-panel value="DivinationCardPanel">
                        <v-expansion-panel-title>
                            <v-row no-gutters>
                                <v-col cols="6" class="d-flex justify-start">
                                    <strong>Divination Card Filters</strong>
                                </v-col>
                                <v-col cols="6" class="text--secondary">
                                    <v-fade-transition leave-absolute>
                                        <span v-if=" activeDivinationCardFilters > 0"
                                              key="0">
                                            <v-row no-gutters>
                                                <v-col cols="10">
                                                Active: {{ activeDivinationCardFilters }}
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-tooltip>
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn icon="mdi-close-circle"
                                                                   @click="clearActiveDivinationCardFilters()"
                                                                   density="compact"
                                                                   v-bind="props"
                                                                   :disabled="activeDivinationCardFilters < 1"></v-btn>
                                                        </template>
                                                        <p>Clear Active Divination Card Filters</p>
                                                    </v-tooltip>
                                                </v-col>
                                        </v-row>
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <MinimumDivinationCardPriceFilter/>
                            <MinimumEffectiveCardValueFilter/>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>