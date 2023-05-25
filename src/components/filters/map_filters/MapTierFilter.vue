<script setup lang="ts">
import {ref} from "vue";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore();

let includeMapTier = ref(false)
let mapTier = ref([1, 16])

function handleIncludeMapTierFilter() {
    filterStore.SET_INCLUDE_MAP_TIER(!includeMapTier.value)
}

function debounceMapTierFilter(value: [number, number]) {
    if (!(value[0] == filterStore.mapTier[0] && value[1] == filterStore.mapTier[1])) {
        filterStore.SET_MAP_TIER(value)
    }
}
</script>

<template>
    <v-row no-gutters>
        <v-col>
            Map Tier
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="1">
            <v-checkbox v-model="includeMapTier"
                        @click="handleIncludeMapTierFilter()"
                        density="compact"></v-checkbox>
        </v-col>
        <v-col>
            <v-range-slider
                    v-model="mapTier"
                    strict
                    direction="horizontal"
                    @update:model-value="value => debounceMapTierFilter(value)"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    thumb-label
                    :max="16"
                    :min="1"
                    :disabled="!includeMapTier"
            >
                <template v-slot:prepend>
                    <v-label style="white-space: break-spaces">{{ mapTier[0] }}
                    </v-label>
                </template>
                <template v-slot:append>
                    <v-label style="white-space: break-spaces">{{ mapTier[1] }}
                    </v-label>
                </template>
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>