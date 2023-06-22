<script setup lang="ts">

import AtlasNodeEditor from "@/components/atlas_node_editor/AtlasNodeEditor.vue";

interface PropsInterface {
    toggleOverlay: boolean;
}

defineProps<PropsInterface>();
</script>

<template>
    <v-overlay :model-value="toggleOverlay" class="align-center justify-center" min-width="30%">
        <v-sheet>
            <AtlasNodeEditor/>
        </v-sheet>
    </v-overlay>
</template>

<style scoped>

</style>