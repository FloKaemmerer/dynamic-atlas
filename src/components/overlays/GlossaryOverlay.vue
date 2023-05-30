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
                    <v-row no-gutters>
                        <v-col>Base Drop Chance:</v-col>
                        <v-col>What is The Base Drop Chance goes here</v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-overlay>
</template>

<style scoped>

</style>