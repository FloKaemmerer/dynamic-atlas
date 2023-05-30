<script setup lang="ts">

import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();
let minDivinationCardPrice = ref()

function handleMinimumDivinationCardPriceFilter(value: string) {
    filterStore.SET_MINIMUM_DIVINATION_CARD_PRICE(Number.parseInt(value))
}
</script>

<template>

    <v-text-field
            v-model="minDivinationCardPrice"
            @update:model-value="val => handleMinimumDivinationCardPriceFilter(val)"
            hide-details
            single-line
            label="Minimal Price in Chaos Orbs"
            type="number"
            variant="outlined"
            style="width: 100%"
            density="compact"
            min="0">
        <template v-slot:append>
            <v-tooltip>
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
                <p>Filter based on the minimal required estimated price of a Divination Card that drops in a Map.</p>
            </v-tooltip>
        </template>
    </v-text-field>
</template>

<style scoped>

</style>