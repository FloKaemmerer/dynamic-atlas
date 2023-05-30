<script setup lang="ts">

import TextFilter from "@/components/filter_drawer/filters/text_filters/TextFilter.vue";
</script>

<template>
    <v-card>
        <v-toolbar density="compact">
            <v-toolbar-title class="text-h6">
                Filter by Text
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <TextFilter/>
        </v-card-text>
    </v-card>
</template>

<style scoped>

</style>