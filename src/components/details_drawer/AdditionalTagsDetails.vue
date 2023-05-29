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
</template>

<style scoped>

</style>