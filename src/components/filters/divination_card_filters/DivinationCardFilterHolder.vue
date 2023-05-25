<script setup lang="ts">

import MinimumDivinationCardValueFilter
    from "@/components/filters/divination_card_filters/MinimumDivinationCardValueFilter.vue";
</script>

<template>
    <v-card>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title>Divination Card Filters</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <MinimumDivinationCardValueFilter/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>