<script setup lang="ts">

interface PropsInterface {
    toggleOverlay: boolean;
}

defineProps<PropsInterface>();
</script>

<template>
    <v-overlay :model-value="toggleOverlay" class="align-center justify-center">
        <v-card>
            <v-card-title>About / Credits</v-card-title>
            <v-card-text>
                All Assets used are property of Grinding Gear Games <br>
                <br>
                AtlasNode Data from poedb.tw<br>
                Divination Card Data from poe.ninja<br>
                Some Layout and Boss Values from mapsOfExile.com<br>
                General Data about Maps from poewiki.net
            </v-card-text>
        </v-card>
    </v-overlay>
</template>

<style scoped>

</style>