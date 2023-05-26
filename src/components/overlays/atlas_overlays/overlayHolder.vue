<script setup lang="ts">
import AtlasNodeOverlayPicker from "@/components/overlays/atlas_overlays/atlasNodeOverlayPicker.vue";
import DivinationCardOverlayPicker from "@/components/overlays/atlas_overlays/divinationCardOverlayPicker.vue";
</script>

<template>
    <v-card>
        <v-toolbar density="compact">
            <v-toolbar-title class="text-h6">
                Overlays
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title> Map Overlays</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <AtlasNodeOverlayPicker/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-title> Divination Card Overlays</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <DivinationCardOverlayPicker/>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>