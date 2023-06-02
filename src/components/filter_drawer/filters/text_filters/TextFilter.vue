<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let filterText = ref(filterStore.filterText);

function handleTextFilter(value: string) {
    filterStore.SET_FILTER_TEXT(value);
}
</script>

<template>
    <v-text-field
            v-model="filterText"
            @update:model-value="val => handleTextFilter(val)"
            density="compact"
            variant="underlined"
            label="Filter... (eg: Doctor|Nurse|Patient)"
            prepend-inner-icon="mdi-magnify"
            single-line
            class="mx-2"
            color="#198754"
            :hide-details="true"
            clearable/>
</template>

<style scoped>

</style>