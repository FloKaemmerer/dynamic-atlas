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
            min="0">
        <template v-slot:append>
            <v-tooltip>
                <template v-slot:activator="{ props }">
                    <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                </template>
                <p>Filter based on the minimal required Effective Value of a Divination Card that drops in a Map.</p>
                <p>The Effective Value is determined by 'Card sell Price * Base Drop Chance * 100'</p>
                <p>The Filter only takes Cards into account with a price >= 5 Chaos</p>
            </v-tooltip>
        </template>
    </v-text-field>
</template>

<style scoped>

</style>