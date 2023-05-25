<script setup lang="ts">

import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();
let minDivinationCardValue = ref()

function handleMinimumDivinationCardValueFilter(value: string) {
    filterStore.SET_MINIMUM_DIVINATION_CARD_VALUE(Number.parseInt(value))
}
</script>

<template>
    <v-text-field
            v-model="minDivinationCardValue"
            @update:model-value="val => handleMinimumDivinationCardValueFilter(val)"
            hide-details
            single-line
            label="Minimal Value in Chaos Orbs"
            type="number"
            variant="outlined"
            style="width: 100%"
            density="compact"
            min="0"></v-text-field>
</template>

<style scoped>

</style>