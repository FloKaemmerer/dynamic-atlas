<script setup lang="ts">
import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let minEffectiveDivinationCardValue = ref()

function handleMinimumEffectiveDivinationCardValueFilter(value: string) {
    filterStore.SET_MINIMUM_EFFECTIVE_DIVINATION_CARD_VALUE(Number.parseInt(value))
}
</script>

<template>
    <v-text-field
            v-model="minEffectiveDivinationCardValue"
            @update:model-value="val => handleMinimumEffectiveDivinationCardValueFilter(val)"
            hide-details
            single-line
            label="Minimal Effective Value in Chaos Orbs"
            type="number"
            variant="outlined"
            style="width: 100%"
            density="compact"
            min="0"></v-text-field>
</template>

<style scoped>

</style>