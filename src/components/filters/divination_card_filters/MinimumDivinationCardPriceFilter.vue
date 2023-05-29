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
            min="0"></v-text-field>
</template>

<style scoped>

</style>