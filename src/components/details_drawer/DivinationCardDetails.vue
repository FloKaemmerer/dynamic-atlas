<script setup lang="ts">

import type {AtlasNode} from "@/model/atlasNode";
import {ref} from "vue";
import type {DivinationCard} from "@/model/divinationCard";

interface PropsInterface {
    atlasNode: AtlasNode;
}

const props = defineProps<PropsInterface>();

let hideLowValueCards = ref(false)

function getDivinationCards(): DivinationCard[] | undefined {
    const divinationCards = props.atlasNode.divinationCards;
    if (!hideLowValueCards.value) {
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
                    <v-checkbox label="Hide Low Value Cards" v-model="hideLowValueCards"
                                density="compact"></v-checkbox>
                </v-sheet>
                <div class="pa-4">
                    <v-chip-group>
                        <v-chip
                                v-for="divinationCard in getDivinationCards()"
                                :key="divinationCard.name">
                            {{ divinationCard.name }} - {{ divinationCard.chaosValue }} Chaos
                            <template v-slot:append v-if="divinationCard.bossOnly">
                                <v-tooltip text="Boss only drop">
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