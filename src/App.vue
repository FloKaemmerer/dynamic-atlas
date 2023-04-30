<script setup lang="ts">
import {RouterView} from 'vue-router'
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";

const atlasNodeStore = useAtlasNodeStore()

atlasNodeStore.setupAtlasData()
</script>

<template>
  <v-app>
    <v-layout>
        <RouterView/>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
