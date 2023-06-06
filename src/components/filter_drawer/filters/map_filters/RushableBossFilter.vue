<script setup lang="ts">
import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let rushableBoss = ref(filterStore.rushableBoss)

filterStore.$subscribe((mutation, state) => {
    if (state.rushableBoss != rushableBoss.value) {
        rushableBoss.value = state.rushableBoss
    }
})

function handleRushableBossFilter() {
    filterStore.SET_RUSHABLE_BOSS(!rushableBoss.value)
}
</script>

<template>
    <v-row no-gutters>
        <v-checkbox label="Rushable Boss"
                    v-model="rushableBoss"
                    @click="handleRushableBossFilter()"
                    density="compact">
            <template v-slot:append>
                <v-tooltip
                        text="A Boss is considered Rushable, if it is easy and/or predictable to reach (eg. Mesa, Dunes)">
                    <template v-slot:activator="{ props }">
                        <v-icon icon="mdi-information-outline"
                                v-bind="props"></v-icon>
                    </template>
                </v-tooltip>
            </template>
        </v-checkbox>
    </v-row>
</template>

<style scoped>

</style>