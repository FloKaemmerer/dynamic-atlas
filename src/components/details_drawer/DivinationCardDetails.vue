<script setup lang="ts">

import type {AtlasNode} from "@/model/atlasNode";
import {ref} from "vue";
import type {DivinationCard} from "@/model/divinationCard";

interface PropsInterface {
    atlasNode: AtlasNode;
}

const props = defineProps<PropsInterface>();

let showLowValueCards = ref(false)

function getDivinationCards(): DivinationCard[] | undefined {
    const divinationCards = props.atlasNode.divinationCards;
    if (showLowValueCards.value) {
        return divinationCards
    }
    return divinationCards?.filter(divinationCard => {
        return divinationCard.chaosValue > 5;
    })
}
</script>

<template>
    <v-row>
        <v-col>
            <v-sheet
                    elevation="10"
                    rounded="xl">
                <v-sheet class="pa-3 bg-black"
                         rounded="t-xl">Divination Cards
                    <v-checkbox label="Show Low Value Cards" v-model="showLowValueCards"
                                density="compact"></v-checkbox>
                </v-sheet>
                <div class="pa-4">
                    <v-chip-group>
                        <v-chip
                                v-for="divinationCard in getDivinationCards()"
                                :key="divinationCard.name"
                        >
                            {{ divinationCard.name }} - {{ divinationCard.chaosValue }} Chaos
                            <template v-slot:append>
                                <v-tooltip min-width="300">
                                    <template v-slot:activator="{ props }">
                                        <v-icon icon="mdi-information-outline" v-bind="props"></v-icon>
                                    </template>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            Sell Price:
                                        </v-col>
                                        <v-col>
                                            {{ divinationCard.chaosValue.toFixed(2) }} - Chaos Orbs
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            Effective Value:
                                        </v-col>
                                        <v-col>
                                            {{ divinationCard.effectiveValue.toFixed(2) }} - Chaos Orbs
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            Base Drop Chance:
                                        </v-col>
                                        <v-col>
                                            {{ (divinationCard.baseDropChance * 100).toFixed(3) }}%
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            Stack Size:
                                        </v-col>
                                        <v-col>
                                            {{ divinationCard.stackSize }}
                                        </v-col>
                                    </v-row>
                                    <!--                                    <v-row no-gutters>-->
                                    <!--                                        <v-col cols="5">-->
                                    <!--                                            Reward:-->
                                    <!--                                        </v-col>-->
                                    <!--                                        <v-col>-->
                                    <!--                                            {{ divinationCard.explicitModifiers[0].text }}-->
                                    <!--                                        </v-col>-->
                                    <!--                                    </v-row>-->
                                </v-tooltip>
                                <v-tooltip text="Boss only drop" v-if="divinationCard.bossOnly">
                                    <template v-slot:activator="{ props }">
                                        <v-icon icon="mdi-skull" v-bind="props"></v-icon>
                                    </template>
                                </v-tooltip>
                            </template>
                        </v-chip>
                    </v-chip-group>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>