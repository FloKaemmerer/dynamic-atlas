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
</template>

<style scoped>

</style>