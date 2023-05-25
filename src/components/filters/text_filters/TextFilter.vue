<script setup lang="ts">

import {useFilterStore} from "@/store/FilterStore";
import {ref} from "vue";

const filterStore = useFilterStore();
let filterText = ref("");
</script>

<template>
    <v-text-field
            v-model="filterText"
            @update:model-value="val => filterStore.SET_FILTER_TEXT(val)"
            density="compact"
            variant="underlined"
            label="Filter... (eg: Doctor|Nurse|Patient)"
            prepend-inner-icon="mdi-magnify"
            single-line
            class="mx-2"
            color="#198754"
            :hide-details="true"
            clearable></v-text-field>
</template>

<style scoped>

</style>