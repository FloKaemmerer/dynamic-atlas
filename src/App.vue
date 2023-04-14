<script setup lang="ts">
import {RouterView} from 'vue-router'
import FilterDrawer from '@/components/FilterDrawer.vue'
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import DetailsDrawer from "@/components/DetailsDrawer.vue";

const atlasNodeStore = useAtlasNodeStore()

atlasNodeStore.setupAtlasData()
</script>

<template>
  <v-app>
    <v-layout>
      <FilterDrawer/>

      <v-main style="width: 100%">
        <RouterView/>
      </v-main>

      <DetailsDrawer :drawer="false"/>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
