<script setup lang="ts">

import MinimumDivinationCardPriceFilter
    from "@/components/filter_drawer/filters/divination_card_filters/MinimumDivinationCardPriceFilter.vue";
import MinimumEffectiveCardValueFilter
    from "@/components/filter_drawer/filters/divination_card_filters/MinimumEffectiveCardValueFilter.vue";
</script>

<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>Divination Card Filters</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <MinimumDivinationCardPriceFilter/>
                        <MinimumEffectiveCardValueFilter/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>