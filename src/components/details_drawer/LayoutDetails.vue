<script setup lang="ts">
import type {AtlasNode} from "@/model/atlasNode";

interface PropsInterface {
    atlasNode: AtlasNode;
}

defineProps<PropsInterface>();
</script>

<template>
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
                                Terrain Slots:
                            </v-sheet>
                        </v-col>
                        <v-col cols="6">
                            <v-sheet>
                                <v-label>{{ atlasNode.nodeLayout.terrainSlots }}</v-label>
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
                                    atlasNode.nodeLayout.rushableBoss ? 'mdi-check-bold' : 'mdi-close-thick'
                                    }}
                                </v-icon>
                            </v-sheet>
                        </v-col>

                    </v-row>
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>