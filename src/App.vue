<script setup lang="ts">
import { RouterView } from 'vue-router'
import FilterDrawer from '@/components/FilterDrawer.vue'
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";

const atlasNodeStore = useAtlasNodeStore()

atlasNodeStore.setupAtlasData()
</script>

<template>
  <v-layout>
    <FilterDrawer />
    <v-main style="width: 100%">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
