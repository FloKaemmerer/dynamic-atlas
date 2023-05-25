<script setup lang="ts">

interface PropsInterface {
    toggleOverlay: boolean;
}

defineProps<PropsInterface>();
</script>

<template>
    <v-overlay :model-value="toggleOverlay" class="align-center justify-center" min-width="30%">
        <v-sheet>
            <v-card>
                <v-card-text>
                    info@poeatlas.app
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-overlay>
</template>

<style scoped>

</style>