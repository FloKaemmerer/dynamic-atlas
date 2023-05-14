<template>
    <v-navigation-drawer v-if="atlasNode" :model-value="drawer" absolute location="right" :width="350">
        <v-container>
            <v-label class="text-h4">{{ atlasNode.name }}</v-label>
            <v-spacer></v-spacer>
            <v-label class="text-h5">Natural Tier: {{ atlasNode.mapTier }}</v-label>
            <v-spacer></v-spacer>
            <v-label class="text-h5">Number of Bosses: {{ atlasNode.boss.numberOfBosses }}</v-label>
            <v-spacer></v-spacer>
            <v-row justify="center">
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
        </v-container>
    </v-navigation-drawer>
</template>

<script setup lang="ts">

import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {computed, ref} from "vue";
import type {AtlasNode} from '@/model/atlasNode'
import type {DivinationCard} from "@/model/divinationCard";

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const atlasNode = computed<AtlasNode | null>(() => atlasNodeStore.selectedAtlasNode);
const drawer = computed<boolean>(() => detailsDrawerStore.drawer)
let hideLowValueCards = ref(false)

function getDivinationCards(): DivinationCard[] | undefined {
    const divinationCards = atlasNode.value?.divinationCards;
    if (!hideLowValueCards.value) {
        return divinationCards
    }
    return divinationCards?.filter(divinationCard => {
        return divinationCard.chaosValue > 5;
    })
}
</script>