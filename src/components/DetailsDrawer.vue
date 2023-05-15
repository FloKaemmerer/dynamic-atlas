<template>
    <v-navigation-drawer v-if="atlasNode" :model-value="drawer" absolute location="right" :width="350">
        <v-container>
            <v-label class="text-h4">{{ atlasNode.name }}</v-label>
            <v-spacer></v-spacer>
            <v-label class="text-h5">Natural Tier: {{ atlasNode.mapTier }}</v-label>
            <v-spacer></v-spacer>
            <v-row>
                <v-col>
                    <v-sheet
                            elevation="10"
                            rounded="xl">
                        <v-sheet class="pa-3 bg-black"
                                 rounded="t-xl">Additional Tags
                        </v-sheet>
                        <div class="pa-4">
                            <v-chip-group>
                                <v-chip
                                        v-for="additionalTag in atlasNode.additionalTags"
                                        :key="additionalTag">
                                    {{ additionalTag }}
                                </v-chip>
                            </v-chip-group>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-sheet elevation="10" rounded="xl">
                        <v-sheet class="pa-3 bg-black" rounded="t-xl">
                            Layout
                        </v-sheet>
                        <div class="pa-4">
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <v-sheet>
                                        Openness:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.nodeLayout.openness }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Traversability:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.nodeLayout.traversability }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Linearity:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.nodeLayout.linearity }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Backtrack Factor:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.nodeLayout.backtrackFactor }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Base Mob Count:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.nodeLayout.baseMobCount }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Rushable Boss:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-icon class="mr-3">
                                            {{
                                            atlasNode.nodeLayout.rushableBoss ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                            }}
                                        </v-icon>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-sheet elevation="10" rounded="xl">
                        <v-sheet class="pa-3 bg-black" rounded="t-xl">
                            Boss
                        </v-sheet>
                        <div class="pa-4">
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <v-sheet>
                                        Number of Bosses:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-label>{{ atlasNode.boss.numberOfBosses }}</v-label>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Phased Boss:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-icon class="mr-3">
                                            {{
                                            atlasNode.boss.phased ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                            }}
                                        </v-icon>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Skippable Phases:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-icon class="mr-3">
                                            {{
                                            atlasNode.boss.skippablePhases ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                            }}
                                        </v-icon>
                                    </v-sheet>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Spawn-Intro Phase:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-icon class="mr-3">
                                        {{
                                        atlasNode.boss.introPhase ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                        }}
                                    </v-icon>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Boss Spawned:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-icon class="mr-3">
                                        {{
                                        atlasNode.boss.spawned ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                        }}
                                    </v-icon>
                                </v-col>

                                <v-col cols="6">
                                    <v-sheet>
                                        Boss in Arena:
                                    </v-sheet>
                                </v-col>
                                <v-col cols="6">
                                    <v-sheet>
                                        <v-icon class="mr-3">
                                            {{
                                            atlasNode.boss.bossArena ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                                            }}
                                        </v-icon>
                                    </v-sheet>
                                </v-col>

                            </v-row>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
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